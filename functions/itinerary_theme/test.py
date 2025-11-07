import requests
import json

url = "https://generate-itinerary-fdikd3j6pa-du.a.run.app"

data = {
    "departure_hub": "ICN",
    "arrival_hub": "BUSAN",
    "duration": "1박2일",
    "theme": "drama"
}

print(f"Sending request to {url}...")
print(f"Body: {json.dumps(data, indent=2, ensure_ascii=False)}\n")

try:
    response = requests.post(url, json=data)
    response.raise_for_status()
    
    print("=== Success Response ===")
    print(json.dumps(response.json(), indent=2, ensure_ascii=False))
except requests.exceptions.RequestException as e:
    print(f"=== Error ===")
    print(f"Error: {e}")
    if hasattr(e.response, 'text'):
        print(f"Response: {e.response.text}")
