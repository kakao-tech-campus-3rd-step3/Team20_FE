# UserInfo Feature

마이페이지 기능을 담당하는 feature입니다.

## 구조

```
UserInfo/
├── api/
│   └── myPageApi.ts          # 마이페이지 API 호출
├── hooks/
│   └── useMyPageData.ts      # 마이페이지 데이터 조회 hook
├── model/
│   └── types.ts              # 타입 정의
├── ui/
│   ├── MyPage.tsx            # 메인 마이페이지 컴포넌트
│   ├── UserProfile.tsx       # 사용자 프로필 컴포넌트
│   ├── ItineraryList.tsx     # 동선 리스트 컴포넌트
│   ├── ItineraryCard.tsx     # 동선 카드 컴포넌트
│   └── ItineraryDetailModal.tsx # 동선 상세 모달
└── index.ts                  # Public exports
```

## API

### GET /api/users/mypage

사용자의 마이페이지 정보를 조회합니다.

**Response:**
```json
{
  "status": 200,
  "message": "마이페이지를 로드하는데 성공했습니다",
  "data": {
    "email": "user@example.com",
    "nickname": "사용자닉네임",
    "list": [
      {
        "itineraryId": 24,
        "user": {
          "userId": 110,
          "nickname": "사용자닉네임"
        },
        "title": "동선 제목",
        "description": "동선 설명",
        "createdAt": "2025-10-18T14:22:34",
        "locations": [
          {
            "locationId": 10,
            "name": "장소명",
            "address": "주소",
            "visitOrder": 1
          }
        ]
      }
    ]
  }
}
```

## 컴포넌트

### MyPage
메인 마이페이지 컴포넌트로, 사용자 프로필과 동선 리스트를 표시합니다.

### UserProfile
사용자의 이메일과 닉네임을 표시하는 프로필 컴포넌트입니다.

### ItineraryList
동선 목록을 그리드 형태로 표시합니다. 동선이 없을 경우 빈 상태 UI를 보여줍니다.

### ItineraryCard
개별 동선 정보를 카드 형태로 표시합니다. 클릭 시 상세 모달이 열립니다.

### ItineraryDetailModal
동선의 상세 정보를 모달로 표시합니다. 각 장소를 타임라인 형태로 보여줍니다.

## 사용 예시

```tsx
import { MyPage } from '@/features/UserInfo';

function MyPageRoute() {
  return <MyPage />;
}
```
