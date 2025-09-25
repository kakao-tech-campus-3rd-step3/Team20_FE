# Contents API 명세

> 공통 응답 형식은 [공통응답.md](./공통응답.md) 문서를 참고하세요.

## 🍿 인기 콘텐츠 Top 10 조회

인기 콘텐츠 Top 10 목록을 인기순으로 조회합니다.

**Method:** `GET`  
**Endpoint:** `/contents`

### ✅ 성공 응답 (200 OK)

```json
{
  "status": 200,
  "message": "인기 콘텐츠 Top 10 조회 성공",
  "data": [
    {
      "contentId": 1,
      "title": "이두나1",
      "posterImageUrl": "https:...."
    },
    {
      "contentId": 2,
      "title": "이태원 클라스1",
      "posterImageUrl": "https:...."
    },
    {
      "contentId": 3,
      "title": "더 글로리1",
      "posterImageUrl": "https:...."
    }
    // ... more items (최대 10개)
  ]
}
```

## 🎭 카테고리별 콘텐츠 조회

특정 카테고리의 인기 콘텐츠를 쵀대 20개 조회합니다.

**Method:** `GET`  
**Endpoint:** `/contents?category={category}`

### Query Parameters

| 매개변수   | 타입   | 설명                                |
| ---------- | ------ | ----------------------------------- |
| `category` | String | 카테고리 (예: drama, movie, pop 등) |

### ✅ 성공 응답 (200 OK)

```json
{
  "status": 200,
  "message": "'drama' 카테고리 인기 콘텐츠 조회 성공",
  "data": [
    {
      "contentId": 1,
      "title": "이두나1",
      "posterImageUrl": "https:...."
    },
    {
      "contentId": 2,
      "title": "이태원 클라스1",
      "posterImageUrl": "https:...."
    }
    // ... more items
  ]
}
```

## 🎬 콘텐츠 상세 정보 조회

ID를 사용하여 특정 콘텐츠의 상세 정보를 조회합니다.

**Method:** `GET`  
**Endpoint:** `/contents/{id}`

### Path Parameters

| 매개변수 | 타입    | 설명             |
| -------- | ------- | ---------------- |
| `id`     | Integer | 콘텐츠의 고유 ID |

### ✅ 성공 응답 (200 OK)

```json
{
  "status": 200,
  "message": "콘텐츠 상세 정보 조회 성공",
  "data": {
    "contentId": 1,
    "category": "DRAMA",
    "title": "이두나",
    "releaseDate": "2024-03-09",
    "posterImageUrl": "https:....",
    "posterImageUrlVertical": "https:....",
    "description": "평범한 대학생인 '이원준'이 은퇴한 전직 아이돌 '이두나'가 사는 셰어하우스에 살게 되면서 벌어지는 로맨스 이야기",
    "artists": [
      {
        "artistId": 201,
        "name": "수지"
      },
      {
        "artistId": 202,
        "name": "양세종"
      }
    ]
  }
}
```

## 🗺️ 콘텐츠 관련 장소 조회

특정 콘텐츠와 관련된 모든 장소 목록을 조회합니다.

**Method:** `GET`  
**Endpoint:** `/contents/{id}/related-locations`

### Path Parameters

| 매개변수 | 타입    | 설명             |
| -------- | ------- | ---------------- |
| `id`     | Integer | 콘텐츠의 고유 ID |

### ✅ 성공 응답 (200 OK)

```json
{
  "status": 200,
  "message": "콘텐츠 관련 장소 조회 성공",
  "data": [
    {
      "location_id": 101,
      "name": "더현대 서울",
      "scene_description": "MZ세대의 성지로 불리는 서울의 대표적인 백화점입니다.",
      "location_image_url": "https:....",
      "contentId": 1
    }
    // ... more locations
  ]
}
```
