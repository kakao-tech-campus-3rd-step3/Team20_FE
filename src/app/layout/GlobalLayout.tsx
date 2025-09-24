import { Header } from '@/features/Header';
import { Footer } from '@/features/Footer';
import type { ReactNode } from 'react';

interface GlobalLayoutProps {
  children: ReactNode;
}

export const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
