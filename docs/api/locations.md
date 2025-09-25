# Locations API 명세

> 공통 응답 형식은 [공통응답.md](./공통응답.md) 문서를 참고하세요.

## 📍 장소 상세 정보 조회

ID를 사용하여 특정 장소의 상세 정보를 조회합니다.

**Method:** `GET`  
**Endpoint:** `/locations/{id}`

### Path Parameters

| 매개변수 | 타입    | 설명           |
| -------- | ------- | -------------- |
| `id`     | Integer | 장소의 고유 ID |

### ✅ 성공 응답 (200 OK)

```json
{
  "status": 200,
  "message": "장소 상세 조회 성공",
  "data": {
    "locationId": 101,
    "name": "더현대 서울",
    "address": "서울 영등포구 여의대로 108",
    "latitude": 37.5258,
    "longitude": 126.9285,
    "description": "MZ세대의 성지로 불리는 서울의 대표적인 백화점입니다.",
    "locationImage": "https:....",
    "relatedContents": [
      {
        "contentId": 4,
        "title": "BTS",
        "category": "POP"
      },
      {
        "contentId": 5,
        "title": "오징어게임",
        "category": "DRAMA"
      },
      {
        "contentId": 6,
        "title": "신과 함께",
        "category": "MOVIE"
      }
    ]
  }
}
```

### ❌ 실패 응답 (404 Not Found)

요청한 `id`에 해당하는 장소가 없을 경우, 공통 실패 응답 형식에 따라 오류를 반환합니다.

**요청 예시:**

```
GET /locations/999
```

**응답 예시:**

```json
{
  "status": 404,
  "message": "해당 장소를 찾을 수 없습니다.",
  "code": "NOT_FOUND_LOCATION"
}
```
