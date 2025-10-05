import { Header } from '@/features/Header';
import { Footer } from '@/features/Footer';
import { Toast } from '@/features/Toast';
import 'react-toastify/dist/ReactToastify.css';
import type { ReactNode } from 'react';

interface GlobalLayoutProps {
  children: ReactNode;
}

export const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <>
      <Header />
      <main className="w-full bg-gradient-to-b from-[var(--color-brand-primary)]/10 to-[var(--color-brand-primary)]/50">
        {children}
      </main>
      <Toast />
      <Footer />
    </>
  );
};
