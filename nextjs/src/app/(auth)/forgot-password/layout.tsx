import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '비밀번호 찾기 - K-SPOT',
  description: '비밀번호를 잊으셨나요? 이메일로 재설정 링크를 받아보세요',
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

