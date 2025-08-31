# AkSpot 프로젝트

React + TypeScript + Vite 기반의 모던 웹 애플리케이션입니다.

## 📁 프로젝트 구조 (FSD)

```
src/
├── app/                 # 애플리케이션 계층
├── pages/              # 페이지 계층
├── features/           # 기능 계층
├── entities/           # 엔티티 계층 (도메인 모델)
└── shared/             # 공유 계층 (공통 코드)
```

## 🔄 Import 규칙

```typescript
// ✅ 올바른 방법 - alias 사용
import { Grandparent } from '@/entities/content/ui';

// ❌ 잘못된 방법 - 상대경로
import { Grandparent } from '../../../entities/content/ui/Grandparent';
```

**캡슐화 원칙**: 각 계층의 `index.ts`에서만 export, `@/layer/slices/segment` 까지만 import

## 🧹 코드 품질 관리

### ESLint & Prettier 설정

- **TypeScript ESLint**: 타입 안전성 검사
- **React Hooks**: 의존성 배열 검사
- **Prettier**: 일관된 코드 스타일

### 명령어

```bash
npm run build         # 빌드
npm run lint          # 린트 검사
npm run lint:fix      # 자동 수정
npm run format        # 포맷팅 적용
npm run type-check    # 타입 체크
npm run test          # 전체 검증
```

### Prettier 설정

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100
}
```

## 📚 주요 기술 스택

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS**: 스타일링
- **React Query**: 서버 상태 관리
- **React Hook Form**: 폼 관리
- **React Router**: 라우팅
- **Zod**: 스키마 검증

## 📋 개발 워크플로

1. 기능별 브랜치 생성
2. FSD 구조에 맞게 개발
3. `npm run test`로 검증
4. PR 템플릿에 맞게 제출

## 🤝 기여 가이드

- alias import 필수 사용
- ESLint/Prettier 규칙 준수
- 커밋 전 전체 테스트 실행

---

상세 정보: [GitHub 템플릿 가이드](.github/README.md)
