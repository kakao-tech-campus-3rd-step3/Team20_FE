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
      <main className="w-full bg-[#f7f2f2]">{children}</main>
      <Toast />
      <Footer />
    </>
  );
};
