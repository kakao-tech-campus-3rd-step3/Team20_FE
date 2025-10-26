import { MyPage } from '@/features/MyPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지 - K-SPOT',
  description: '내 여행 계획과 저장된 장소를 확인해보세요',
};

export default function MyPagePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <MyPage />
    </div>
  );
}
