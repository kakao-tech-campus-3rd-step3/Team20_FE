import { createFileRoute } from '@tanstack/react-router';
import { SignupForm } from '../../features/auth';

export const Route = createFileRoute('/auth/signup')({
  component: SignupPage,
});

function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-16 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-12 px-8 shadow-2xl rounded-2xl border border-gray-100">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
