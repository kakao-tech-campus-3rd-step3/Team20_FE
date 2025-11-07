import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지 - K-SPOT',
  description: '내 정보와 저장한 동선을 확인하고 관리하세요',
  keywords: ['마이페이지', '프로필', '동선', '여행계획'],
  openGraph: {
    title: '마이페이지 - K-SPOT',
    description: '내 정보와 저장한 동선을 확인하고 관리하세요',
    type: 'website',
  },
};

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

