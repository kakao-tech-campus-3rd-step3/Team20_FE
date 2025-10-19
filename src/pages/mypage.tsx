import { createFileRoute } from '@tanstack/react-router';
import { MyPage } from '../features/UserInfo';

export const Route = createFileRoute('/mypage')({
  component: MyPageComponent,
});

function MyPageComponent() {
  return <MyPage />;
}
