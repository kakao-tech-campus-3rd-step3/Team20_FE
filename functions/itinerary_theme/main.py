"""
Main Cloud Function entry point for AI Itinerary Generator.

This module handles HTTP requests, orchestrates the itinerary generation process,
and returns formatted JSON responses with proper error handling.
"""

import json
import os
import time
from datetime import datetime

# Import local modules
from db import get_db_connection, get_popular_contents, get_all_locations_for_contents
from geo_utils import extract_region, filter_locations_by_distance
from prompts import build_itinerary_prompt
from gemini_client import initialize_gemini, generate_itinerary_with_retry


# ===== GLOBAL INITIALIZATION (Cold Start Optimization) =====
# Load static data and initialize AI model once at module level
# This reduces latency for subsequent requests in the same instance

def load_transport_hubs():
    """
    Load transport hub data from JSON file.
    
    Returns:
        dict: Transport hubs data with 'airports' and 'stations' lists
        
    Raises:
        FileNotFoundError: If transport_hubs.json is not found
        json.JSONDecodeError: If JSON file is invalid
    """
    hub_file_path = os.path.join(os.path.dirname(__file__), 'data', 'transport_hubs.json')
    
    with open(hub_file_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def validate_hub(hub_id, transport_hubs):
    """
    Validate and retrieve hub details from transport hubs data.
    
    Args:
        hub_id (str): Hub ID to validate
        transport_hubs (dict): Transport hubs data
        
    Returns:
        dict: Hub details with id, name, latitude, longitude, address
        None: If hub not found
    """
    # Check in airports
    for airport in transport_hubs.get('airports', []):
        if airport['id'] == hub_id:
            return airport
    
    # Check in stations
    for station in transport_hubs.get('stations', []):
        if station['id'] == hub_id:
            return station
    
    return None


def get_all_hub_ids(transport_hubs):
    """
    Get list of all valid hub IDs.
    
    Args:
        transport_hubs (dict): Transport hubs data
        
    Returns:
        list[str]: List of all valid hub IDs
    """
    hub_ids = []
    
    for airport in transport_hubs.get('airports', []):
        hub_ids.append(airport['id'])
    
    for station in transport_hubs.get('stations', []):
        hub_ids.append(station['id'])
    
    return hub_ids


# Load transport hubs data globally (once per instance)
print(f"[STARTUP] 모듈 로딩 시작: {datetime.now().isoformat()}")

try:
    print("[STARTUP] Transport hubs 로딩 시작...")
    TRANSPORT_HUBS = load_transport_hubs()
    print("[STARTUP] Transport hubs loaded successfully")
except Exception as e:
    print(f"[STARTUP ERROR] Failed to load transport hubs: {e}")
    TRANSPORT_HUBS = None

# Initialize Gemini model globally (once per instance)
try:
    print("[STARTUP] Gemini 모델 초기화 시작...")
    GEMINI_MODEL = initialize_gemini()
    print("[STARTUP] Gemini model initialized successfully")
except Exception as e:
    print(f"[STARTUP ERROR] Failed to initialize Gemini model: {e}")
    GEMINI_MODEL = None

print(f"[STARTUP] 모듈 로딩 완료: {datetime.now().isoformat()}")


def generate_itinerary(request):
    """
    Cloud Function entry point for itinerary generation.
    
    Args:
        request (flask.Request): HTTP request object
        
    Returns:
        tuple: (response_dict, status_code, headers)
    """
    print(f"[ENTRY] 함수 진입: {datetime.now().isoformat()}")
    
    # 실제 사용 중인 IP 확인 (디버깅용)
    try:
        import requests
        response = requests.get('https://httpbin.org/ip', timeout=5)
        actual_ip = response.json().get('origin', 'unknown')
        print(f"[DEBUG] 실제 사용 중인 IP: {actual_ip}")
    except Exception as e:
        print(f"[DEBUG] IP 확인 실패: {str(e)}")
    
    # CORS headers for all responses
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    }
    
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        return ('', 204, headers)
    
    try:
        print(f"[INFO] 요청 수신: {datetime.now().isoformat()}")
        
        # ===== SUBTASK 6.1: Input Validation =====
        
        # Parse JSON request body
        try:
            request_json = request.get_json(silent=True)
            if not request_json:
                return (
                    json.dumps({'success': False, 'error': '요청 본문이 비어있거나 유효한 JSON이 아닙니다.'}, ensure_ascii=False),
                    400,
                    headers
                )
        except Exception as e:
            return (
                json.dumps({'success': False, 'error': f'JSON 파싱 실패: {str(e)}'}, ensure_ascii=False),
                400,
                headers
            )
        
        # Extract required fields
        departure_hub = request_json.get('departure_hub')
        arrival_hub = request_json.get('arrival_hub')
        duration = request_json.get('duration')
        theme = request_json.get('theme')
        
        # Validate presence of required fields
        missing_fields = []
        if not departure_hub:
            missing_fields.append('departure_hub')
        if not arrival_hub:
            missing_fields.append('arrival_hub')
        if not duration:
            missing_fields.append('duration')
        if not theme:
            missing_fields.append('theme')
        
        if missing_fields:
            return (
                json.dumps({
                    'success': False,
                    'error': f'필수 필드가 누락되었습니다: {", ".join(missing_fields)}'
                }, ensure_ascii=False),
                400,
                headers
            )
        
        # Validate duration value
        valid_durations = ["당일", "1박2일", "2박3일"]
        if duration not in valid_durations:
            return (
                json.dumps({
                    'success': False,
                    'error': f'유효하지 않은 duration 값입니다. 허용된 값: {", ".join(valid_durations)}'
                }, ensure_ascii=False),
                400,
                headers
            )
        
        # Validate theme value
        valid_themes = ["all", "drama", "movie", "pop"]
        if theme not in valid_themes:
            return (
                json.dumps({
                    'success': False,
                    'error': f'유효하지 않은 theme 값입니다. 허용된 값: {", ".join(valid_themes)}'
                }, ensure_ascii=False),
                400,
                headers
            )
        
        print(f"[INFO] 입력 검증 완료: departure={departure_hub}, arrival={arrival_hub}, duration={duration}, theme={theme}")
        
        # ===== SUBTASK 6.2: Transport Hub Validation =====
        
        # Use globally loaded transport hubs data
        if TRANSPORT_HUBS is None:
            print("[ERROR] 전역 transport_hubs가 로드되지 않았습니다.")
            return (
                json.dumps({'success': False, 'error': '서버 설정 오류: 교통 허브 데이터를 찾을 수 없습니다.'}, ensure_ascii=False),
                500,
                headers
            )
        
        # Validate departure hub
        departure_details = validate_hub(departure_hub, TRANSPORT_HUBS)
        if not departure_details:
            valid_hub_ids = get_all_hub_ids(TRANSPORT_HUBS)
            return (
                json.dumps({
                    'success': False,
                    'error': f'유효하지 않은 departure_hub입니다. 허용된 값: {", ".join(valid_hub_ids)}'
                }, ensure_ascii=False),
                400,
                headers
            )
        
        # Validate arrival hub
        arrival_details = validate_hub(arrival_hub, TRANSPORT_HUBS)
        if not arrival_details:
            valid_hub_ids = get_all_hub_ids(TRANSPORT_HUBS)
            return (
                json.dumps({
                    'success': False,
                    'error': f'유효하지 않은 arrival_hub입니다. 허용된 값: {", ".join(valid_hub_ids)}'
                }, ensure_ascii=False),
                400,
                headers
            )
        
        # Extract regions from addresses and add to hub details
        departure_region = extract_region(departure_details['address'])
        arrival_region = extract_region(arrival_details['address'])
        
        if not arrival_region:
            print(f"[WARN] 도착지 주소에서 지역 추출 실패: {arrival_details['address']}")
            return (
                json.dumps({'success': False, 'error': '도착지 주소에서 지역을 추출할 수 없습니다.'}, ensure_ascii=False),
                400,
                headers
            )
        
        # Add region field to hub details for prompt generation
        departure_details['region'] = departure_region if departure_region else '알 수 없음'
        arrival_details['region'] = arrival_region
        
        print(f"[INFO] 교통 허브 검증 완료: 출발={departure_details['name']} ({departure_region}), 도착={arrival_details['name']} ({arrival_region})")
        
        # ===== SUBTASK 6.3: Database Query Orchestration =====
        
        connection = None
        try:
            # Create database connection
            print(f"[TIMING] DB 연결 시작: {datetime.now().isoformat()}")
            start_time = time.time()
            
            connection = get_db_connection()
            
            elapsed_time = time.time() - start_time
            print(f"[TIMING] DB 연결 완료: {datetime.now().isoformat()} (소요시간: {elapsed_time:.2f}초)")
            
            if elapsed_time > 10:
                print(f"[WARNING] DB 연결에 {elapsed_time:.2f}초 소요됨 - AWS 방화벽 문제 가능성 높음")
            
            # Query popular contents for arrival region with theme filter
            print(f"[INFO] 인기 컨텐츠 조회 중: region={arrival_region}, theme={theme}")
            popular_contents = get_popular_contents(connection, arrival_region, theme, limit=20)
            print(f"[INFO] 인기 컨텐츠 {len(popular_contents)}개 조회 완료")
            
            if not popular_contents:
                return (
                    json.dumps({
                        'success': False,
                        'error': f'{arrival_region} 지역에 {theme} 테마의 컨텐츠가 없습니다.'
                    }, ensure_ascii=False),
                    400,
                    headers
                )
            
            # Extract content IDs
            content_ids = [content['content_id'] for content in popular_contents]
            
            # Query all filming locations in a single query (eliminates N+1 problem)
            print(f"[INFO] {len(content_ids)}개 컨텐츠의 촬영지 정보 조회 중...")
            all_locations = get_all_locations_for_contents(connection, content_ids)
            
            print(f"[INFO] 총 {len(all_locations)}개 촬영지 조회 완료")
            
            if not all_locations:
                return (
                    json.dumps({
                        'success': False,
                        'error': f'{arrival_region} 지역에 촬영지 정보가 없습니다.'
                    }, ensure_ascii=False),
                    400,
                    headers
                )
        
        except Exception as e:
            print(f"[ERROR] 데이터베이스 오류: {str(e)}")
            return (
                json.dumps({'success': False, 'error': f'데이터베이스 오류: {str(e)}'}, ensure_ascii=False),
                500,
                headers
            )
        
        finally:
            # Close database connection
            if connection:
                connection.close()
                print("[INFO] 데이터베이스 연결 종료")
        
        # ===== SUBTASK 6.4: Geographic Filtering =====
        
        print(f"[INFO] 지리적 필터링 시작: 도착지 좌표=({arrival_details['latitude']}, {arrival_details['longitude']})")
        
        # Filter locations within 50km of arrival hub
        filtered_locations = filter_locations_by_distance(
            arrival_details['latitude'],
            arrival_details['longitude'],
            all_locations,
            max_km=50
        )
        
        print(f"[INFO] 50km 이내 촬영지: {len(filtered_locations)}개")
        
        # Check if at least 3 locations remain
        if len(filtered_locations) < 3:
            return (
                json.dumps({
                    'success': False,
                    'error': f'도착지 근처에 충분한 촬영지가 없습니다. (현재: {len(filtered_locations)}개, 필요: 최소 3개)'
                }, ensure_ascii=False),
                400,
                headers
            )
        
        # ===== SUBTASK 6.5: AI Prompt Generation and API Call =====
        
        print("[INFO] AI 프롬프트 생성 중...")
        
        # Build prompt
        try:
            prompt = build_itinerary_prompt(
                departure=departure_details,
                arrival=arrival_details,
                duration=duration,
                theme=theme,
                contents=popular_contents,
                locations=filtered_locations
            )
            print(f"[INFO] 프롬프트 생성 완료 (길이: {len(prompt)} 문자)")
        except Exception as e:
            print(f"[ERROR] 프롬프트 생성 실패: {str(e)}")
            return (
                json.dumps({'success': False, 'error': f'프롬프트 생성 실패: {str(e)}'}, ensure_ascii=False),
                500,
                headers
            )
        
        # Use globally initialized Gemini model
        if GEMINI_MODEL is None:
            print("[ERROR] 전역 Gemini 모델이 초기화되지 않았습니다.")
            return (
                json.dumps({'success': False, 'error': 'AI 모델 초기화 실패.'}, ensure_ascii=False),
                500,
                headers
            )
        
        # Call Gemini API with retry logic
        try:
            print("[INFO] Gemini API 호출 중...")
            itinerary_data = generate_itinerary_with_retry(GEMINI_MODEL, prompt, max_retries=3)
            print("[INFO] Gemini API 호출 성공")
        except Exception as e:
            print(f"[ERROR] Gemini API 호출 실패: {str(e)}")
            return (
                json.dumps({'success': False, 'error': f'AI 일정 생성 실패: {str(e)}'}, ensure_ascii=False),
                500,
                headers
            )
        
        # ===== SUBTASK 6.6: Response Formatting =====
        
        print("[INFO] 응답 포맷팅 중...")
        
        # Build success response
        response_data = {
            'success': True,
            'data': {
                'selected_contents': itinerary_data.get('selected_contents', []),
                'itinerary': itinerary_data.get('itinerary', {}),
                'summary': itinerary_data.get('summary', {}),
                'metadata': {
                    'departure': {
                        'id': departure_details['id'],
                        'name': departure_details['name'],
                        'region': extract_region(departure_details['address'])
                    },
                    'arrival': {
                        'id': arrival_details['id'],
                        'name': arrival_details['name'],
                        'region': arrival_region
                    },
                    'duration': duration,
                    'theme': theme
                }
            }
        }
        
        print(f"[INFO] 요청 처리 완료: {datetime.now().isoformat()}")
        
        return (
            json.dumps(response_data, ensure_ascii=False),
            200,
            headers
        )
    
    # ===== SUBTASK 6.7: Error Handling and Logging =====
    
    except Exception as e:
        # Catch all unexpected exceptions
        print(f"[ERROR] 예상치 못한 오류 발생: {datetime.now().isoformat()}")
        print(f"[ERROR] 오류 상세: {str(e)}")
        
        import traceback
        print(f"[ERROR] 스택 트레이스:\n{traceback.format_exc()}")
        
        return (
            json.dumps({
                'success': False,
                'error': f'서버 내부 오류가 발생했습니다: {str(e)}'
            }, ensure_ascii=False),
            500,
            headers
        )
