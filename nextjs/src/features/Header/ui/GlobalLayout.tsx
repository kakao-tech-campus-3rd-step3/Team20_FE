'use client';

import { Header } from './Header/Header';
import { Footer } from '@/features/Footer';
import { Toast } from '@/features/Toast';
import 'react-toastify/dist/ReactToastify.css';

interface GlobalLayoutProps {
  children: React.ReactNode;
}

export function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Toast />
      <Footer />
    </div>
  );
}
