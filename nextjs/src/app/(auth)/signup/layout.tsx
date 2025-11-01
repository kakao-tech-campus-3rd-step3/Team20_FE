import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - K-SPOT',
  description: 'K-SPOT 회원가입하고 나만의 K-콘텐츠 여행을 시작하세요',
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

