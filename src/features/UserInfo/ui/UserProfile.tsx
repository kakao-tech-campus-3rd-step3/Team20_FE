import { LogOut } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/shared/lib/auth';
import type { UserProfileProps } from '../model/types';

export const UserProfile = ({ email, nickname }: UserProfileProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/' });
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
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2.5 px-6 py-4 text-sm font-semibold text-white bg-gradient-to-r from-[#a864a2] to-[#c480d4] rounded-xl hover:from-[#a864a2]/90 hover:to-[#c480d4]/90 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <LogOut size={18} className="transition-transform group-hover:translate-x-0.5" />
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};
