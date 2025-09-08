import { Header } from '@/features/Header';
import { Footer } from '@/features/Footer';
import { Outlet } from 'react-router-dom';

export const GlobalLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
