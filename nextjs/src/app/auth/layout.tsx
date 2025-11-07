import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s - K-SPOT 인증',
    default: '인증 - K-SPOT',
  },
  description: 'K-SPOT 서비스 이용을 위한 인증 페이지입니다.',
};

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

