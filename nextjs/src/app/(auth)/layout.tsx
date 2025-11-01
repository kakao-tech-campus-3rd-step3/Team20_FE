import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인 - K-SPOT',
  description: 'K-SPOT에 로그인하고 나만의 여행 동선을 저장하세요',
  keywords: ['로그인', '회원가입', '인증'],
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

