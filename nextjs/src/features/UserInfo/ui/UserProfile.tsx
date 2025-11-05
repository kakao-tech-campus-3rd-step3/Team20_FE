'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/lib/auth';
import type { UserProfileProps } from '../model/types';

export const UserProfile = ({ email, nickname }: UserProfileProps) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="bg-gradient-to-br from-[#eccbee]/30 via-[#c480d4]/10 to-white border-b border-[#eccbee]">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#a864a2] to-[#c480d4] bg-clip-text text-transparent">
              {nickname}
            </h1>
            <p className="text-base text-gray-600">{email}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/ai-itinerary')}
              className="group flex items-center gap-2.5 px-6 py-4 text-sm font-semibold text-[#a864a2] bg-white border-2 border-[#a864a2] rounded-xl hover:bg-[#a864a2] hover:text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              🤖 AI 일정
            </button>
            <button
              onClick={handleLogout}
              className="group flex items-center gap-2.5 px-6 py-4 text-sm font-semibold text-white bg-gradient-to-r from-[#a864a2] to-[#c480d4] rounded-xl hover:from-[#a864a2]/90 hover:to-[#c480d4]/90 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};