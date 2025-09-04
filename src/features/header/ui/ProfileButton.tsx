import { User } from 'lucide-react';

export function ProfileButton() {
  return (
    <button className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg">
      <User className="w-5 h-5 text-white" />
    </button>
  );
}
