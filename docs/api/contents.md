# Contents API 명세

> 공통 응답 형식은 [공통응답.md](./공통응답.md) 문서를 참고하세요.

## 🍿 인기 콘텐츠 목록 조회

인기 콘텐츠 목록을 순위와 함께 조회합니다.

**Method:** `GET`  
**Endpoint:** `/contents/popular`

### ✅ 성공 응답 (200 OK)

```json
{
  "status": 200,
  "message": "인기 콘텐츠 목록 조회 성공",
  "data": [
    {
      "rank": 1,
      "contentId": 1,
      "category": "DRAMA",
      "title": "이두나",
      "posterImageUrl": "https://.../k-drama-doona.webp?raw=true"
    }
    // ... more items
  ]
}
```

## 🎬 콘텐츠 상세 정보 조회

ID를 사용하여 특정 콘텐츠의 상세 정보를 조회합니다.

**Method:** `GET`  
**Endpoint:** `/contents/{content_id}`

### Path Parameters

| 매개변수     | 타입    | 설명             |
| ------------ | ------- | ---------------- |
| `content_id` | Integer | 콘텐츠의 고유 ID |

### ✅ 성공 응답 (200 OK)

```json
{
  "status": 200,
  "message": "콘텐츠 상세 조회 성공",
  "data": {
    "contentId": 1,
    "category": "DRAMA",
    "title": "이두나",
    "posterImageUrl": "https://.../k-drama-doona-horizontal.jpg?raw=true",
    "releaseDate": "2024-03-09",
    "locations": [
      {
        "locationId": 101,
        "name": "더현대 서울",
        "sceneDescription": "주요 촬영 장소"
      }
      // ... more locations
    ]
  }
}
```

## 🗺️ 콘텐츠 촬영지 목록 조회

특정 콘텐츠와 관련된 모든 촬영지(장소) 목록을 조회합니다.

**Method:** `GET`  
**Endpoint:** `/contents/{content_id}/locations`

### Path Parameters

| 매개변수     | 타입    | 설명             |
| ------------ | ------- | ---------------- |
| `content_id` | Integer | 콘텐츠의 고유 ID |

### ✅ 성공 응답 (200 OK)

```json
{
  "status": 200,
  "message": "콘텐츠 촬영지 목록 조회 성공",
  "data": [
    {
      "locationId": 101,
      "name": "더현대 서울",
      "sceneDescription": "주요 촬영 장소"
    },
    {
      "locationId": 102,
      "name": "소피텔 앰배서더 서울",
      "sceneDescription": "주요 촬영 장소"
    }
    // ... more locations
  ]
}
```
