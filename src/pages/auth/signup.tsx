import { createFileRoute, redirect } from '@tanstack/react-router';
import { SignupForm } from '@/features/auth';

export const Route = createFileRoute('/auth/signup')({
  component: SignupPage,
  beforeLoad: async ({ context }) => {
    if (context.auth.isLoggedIn) {
      throw redirect({ to: '/mypage' });
    }
  },
});

function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col justify-center py-16 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-16 px-12 shadow-2xl rounded-3xl border border-gray-100">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
