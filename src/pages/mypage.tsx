import { createFileRoute, redirect } from '@tanstack/react-router';
import { MyPage } from '../features/UserInfo';

export const Route = createFileRoute('/mypage')({
  component: MyPageComponent,
  beforeLoad: async ({ context }) => {
    if (!context.auth.isLoggedIn) {
      throw redirect({ to: '/auth/login' });
    }
  },
});

function MyPageComponent() {
  return <MyPage />;
}
