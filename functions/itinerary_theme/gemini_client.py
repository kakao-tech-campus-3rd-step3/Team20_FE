"""
Gemini AI client module for itinerary generation.

This module handles Google Gemini AI model initialization and API calls
with retry logic for robust itinerary generation.
"""

import os
import json
import time
import google.generativeai as genai


def initialize_gemini():
    """
    Configure Gemini model with API key from environment.
    
    Returns:
        genai.GenerativeModel: Configured Gemini 1.5 Pro model instance
        
    Raises:
        ValueError: If GEMINI_API_KEY environment variable is not set
    """
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable is not set")
    
    genai.configure(api_key=api_key)
    
    generation_config = {
        'temperature': 0.7,
        'top_p': 0.95,
        'top_k': 40,
        'max_output_tokens': 8192
    }
    
    model = genai.GenerativeModel(
        model_name='gemini-2.0-flash',
        generation_config=generation_config
    )
    
    return model


def generate_itinerary_with_retry(model, prompt, max_retries=3):
    """
    Call Gemini API with exponential backoff retry logic.
    
    Args:
        model (genai.GenerativeModel): Configured Gemini model instance
        prompt (str): Formatted prompt for itinerary generation
        max_retries (int): Maximum number of retry attempts (default: 3)
        
    Returns:
        dict: Parsed JSON response from Gemini API
        
    Raises:
        Exception: If all retry attempts fail or JSON parsing fails after retries
    """
    retry_delays = [5, 10, 15]  # 더 긴 대기: 5s, 10s, 15s
    
    for attempt in range(max_retries):
        try:
            print(f"[INFO] Gemini API 호출 시도 {attempt + 1}/{max_retries}")
            
            # Gemini API 호출 (Cloud Function timeout으로 제어)
            response = model.generate_content(prompt)
            
            # Extract text from response (handle multi-part responses)
            try:
                response_text = response.text
            except ValueError:
                # Handle multi-part response
                response_text = ""
                for part in response.candidates[0].content.parts:
                    response_text += part.text
            
            # Parse JSON response (remove markdown code blocks if present)
            try:
                # Remove markdown code blocks (```json ... ```)
                clean_text = response_text.strip()
                if clean_text.startswith('```json'):
                    clean_text = clean_text[7:]  # Remove ```json
                if clean_text.startswith('```'):
                    clean_text = clean_text[3:]   # Remove ```
                if clean_text.endswith('```'):
                    clean_text = clean_text[:-3]  # Remove ending ```
                clean_text = clean_text.strip()
                
                itinerary_data = json.loads(clean_text)
                print(f"[INFO] Gemini API 응답 성공 (시도 {attempt + 1})")
                return itinerary_data
            except json.JSONDecodeError as json_error:
                print(f"[WARN] JSON 파싱 실패 (시도 {attempt + 1}/{max_retries}): {str(json_error)}")
                
                # If this is not the last attempt, retry with delay
                if attempt < max_retries - 1:
                    delay = retry_delays[attempt]
                    print(f"[INFO] {delay}초 후 재시도...")
                    time.sleep(delay)
                    continue
                else:
                    # Last attempt failed
                    raise Exception(f"JSON 파싱 실패: {str(json_error)}. 응답 내용: {response_text[:200]}")
                    
        except Exception as e:
            print(f"[ERROR] Gemini API 호출 실패 (시도 {attempt + 1}/{max_retries}): {str(e)}")
            
            # If this is not the last attempt, retry with delay
            if attempt < max_retries - 1:
                delay = retry_delays[attempt]
                print(f"[INFO] {delay}초 후 재시도...")
                time.sleep(delay)
                continue
            else:
                # Last attempt failed
                raise Exception(f"Gemini API 호출 실패 (모든 재시도 소진): {str(e)}")
    
    # This should not be reached, but just in case
    raise Exception("Gemini API 호출 실패: 알 수 없는 오류")
