import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: 'K-SPOT에 로그인하여 촬영지 동선을 저장하고 관리하세요',
};

export default function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

