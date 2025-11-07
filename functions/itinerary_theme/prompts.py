"""
Prompt generation module for AI Itinerary Generator.
Builds optimized prompts for Gemini AI with travel data and constraints.
"""


def get_days_from_duration(duration):
    """
    Convert Korean duration string to number of days.
    
    Args:
        duration (str): Korean duration string ("당일", "1박2일", "2박3일")
        
    Returns:
        int: Number of days (1, 2, or 3)
        
    Raises:
        ValueError: If duration is not a valid value
    """
    duration_map = {
        "당일": 1,
        "1박2일": 2,
        "2박3일": 3
    }
    
    if duration not in duration_map:
        raise ValueError(f"Invalid duration: {duration}. Must be one of: 당일, 1박2일, 2박3일")
    
    return duration_map[duration]


def get_theme_korean(theme):
    """
    Convert theme code to Korean description.
    
    Args:
        theme (str): Theme code ("all", "drama", "movie", "pop")
        
    Returns:
        str: Korean theme description
        
    Raises:
        ValueError: If theme is not a valid value
    """
    theme_map = {
        "all": "전체 (드라마, 영화, K-POP 모두 포함)",
        "drama": "드라마",
        "movie": "영화",
        "pop": "K-POP"
    }
    
    if theme not in theme_map:
        raise ValueError(f"Invalid theme: {theme}. Must be one of: all, drama, movie, pop")
    
    return theme_map[theme]


def truncate_scene_description(description, max_length=50):
    """
    Truncate scene description to limit prompt size.
    
    Args:
        description (str): Original scene description
        max_length (int): Maximum characters (default: 50)
        
    Returns:
        str: Truncated description with "..." if needed
    """
    if description is None:
        return ""
    
    description = str(description).strip()
    
    if len(description) <= max_length:
        return description
    
    return description[:max_length] + "..."



def build_itinerary_prompt(departure, arrival, duration, theme, contents, locations):
    """
    Build Gemini prompt with travel constraints and data.
    
    Args:
        departure (dict): Departure hub with id, name, latitude, longitude, region
        arrival (dict): Arrival hub with id, name, latitude, longitude, region
        duration (str): "당일", "1박2일", or "2박3일"
        theme (str): "all", "drama", "movie", or "pop"
        contents (list[dict]): Popular contents with content_id, title, category
        locations (list[dict]): Filming locations with location_id, name, latitude, longitude, scene_description
        
    Returns:
        str: Formatted prompt string
    """
    # Convert duration and theme to Korean
    days = get_days_from_duration(duration)
    theme_korean = get_theme_korean(theme)
    
    # Limit contents to top 20
    contents_limited = contents[:20]
    
    # Limit locations to 50
    locations_limited = locations[:50]
    
    # Build contents list
    contents_text = ""
    for idx, content in enumerate(contents_limited, 1):
        contents_text += f"{idx}. [{content['content_id']}] {content['title']} ({content['category']})\n"
    
    # Build locations list with truncated scene descriptions
    locations_text = ""
    for idx, location in enumerate(locations_limited, 1):
        scene = truncate_scene_description(location.get('scene_description', ''))
        locations_text += f"{idx}. [ID: {location['location_id']}] {location['name']}\n"
        locations_text += f"   - 주소: {location.get('address', 'N/A')}\n"
        locations_text += f"   - 좌표: ({location['latitude']}, {location['longitude']})\n"
        if scene:
            locations_text += f"   - 장면: {scene}\n"
    
    # Build the complete prompt
    prompt = f"""당신은 한국 K-컨텐츠 여행 전문 플래너입니다.

## 여행 정보
- 출발지: {departure['name']} ({departure['region']})
- 도착지: {arrival['name']} ({arrival['region']})
- 여행 기간: {duration} ({days}일)
- 테마: {theme_korean}

## {arrival['region']} 지역 인기 컨텐츠 TOP {len(contents_limited)}
{contents_text}

## 방문 가능한 촬영지 목록 ({len(locations_limited)}개)
{locations_text}

## 미션
위의 인기 컨텐츠와 촬영지 정보를 바탕으로 최적의 여행 일정을 생성하세요.

1. **컨텐츠 선택**: 인기 컨텐츠 중에서 3-5개를 선택하고, 각 컨텐츠를 선택한 이유를 설명하세요.
2. **일정 생성**: 선택한 컨텐츠의 촬영지를 방문하는 {days}일 일정을 만드세요.
3. **식사 계획**: 점심(12:00-13:00)과 저녁(18:00-19:00) 시간에 현지 맛집을 포함하세요.
4. **상세 정보**: 각 장소마다 방문 시간, 소요 시간, 추천 활동, 팁을 포함하세요.

## 제약 조건
- 하루 최대 이동 거리: 100km 이내
- 하루 방문 장소: 3-4개 촬영지 (식사 제외)
- 첫날 시작: {arrival['name']} 도착 후 10:00부터
- 마지막날 종료: {departure['name']} 출발 전 18:00까지
- 각 촬영지 방문 시간: 30분~2시간
- 이동 시간을 고려한 현실적인 일정

## 필수 출력 형식 (유효한 JSON만 출력)

{{
  "selected_contents": [
    {{
      "content_id": 123,
      "title": "컨텐츠 제목",
      "category": "DRAMA",
      "reason": "선택 이유 설명",
      "locations_count": 2
    }}
  ],
  "itinerary": {{
    "day_1": [
      {{
        "time": "10:00",
        "location_id": 456,
        "location_name": "촬영지 이름",
        "address": "주소",
        "latitude": 37.5665,
        "longitude": 126.9780,
        "content_id": 123,
        "content_title": "컨텐츠 제목",
        "scene": "촬영 장면 설명",
        "duration": "1시간",
        "activities": ["활동1", "활동2"],
        "tips": "방문 팁"
      }},
      {{
        "time": "12:00",
        "type": "meal",
        "restaurant": "식당 이름",
        "menu": "추천 메뉴",
        "estimated_cost": "15,000원"
      }}
    ]"""
    
    # Add day templates based on duration
    if days >= 2:
        prompt += """,
    "day_2": [
      {{
        "time": "09:00",
        "location_id": 789,
        "location_name": "촬영지 이름",
        "address": "주소",
        "latitude": 37.5665,
        "longitude": 126.9780,
        "content_id": 124,
        "content_title": "컨텐츠 제목",
        "scene": "촬영 장면 설명",
        "duration": "1시간 30분",
        "activities": ["활동1", "활동2"],
        "tips": "방문 팁"
      }}
    ]"""
    
    if days >= 3:
        prompt += """,
    "day_3": [
      {{
        "time": "09:00",
        "location_id": 101,
        "location_name": "촬영지 이름",
        "address": "주소",
        "latitude": 37.5665,
        "longitude": 126.9780,
        "content_id": 125,
        "content_title": "컨텐츠 제목",
        "scene": "촬영 장면 설명",
        "duration": "1시간",
        "activities": ["활동1", "활동2"],
        "tips": "방문 팁"
      }}
    ]"""
    
    prompt += """
  },
  "summary": {{
    "total_locations": 8,
    "total_distance_km": 85.5,
    "transportation": "렌터카 또는 대중교통",
    "estimated_cost_per_person": "150,000원 ~ 200,000원",
    "best_season": "봄(3-5월) 또는 가을(9-11월)"
  }}
}}

**중요**: 반드시 유효한 JSON만 출력하세요. 마크다운 코드 블록(```), 설명, 주석 등은 절대 포함하지 마세요. 위의 JSON 형식을 정확히 따라 출력하세요."""
    
    return prompt
