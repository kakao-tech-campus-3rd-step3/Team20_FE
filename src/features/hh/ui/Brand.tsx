import { Sparkles } from 'lucide-react';
import { BRAND_NAME } from '@/features/hh/model/types';

export function Brand() {
  return (
    <div className="group flex items-center space-x-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 transition-transform duration-300 group-hover:scale-110">
        <Sparkles className="h-6 w-6 text-white" aria-hidden />
      </div>
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent">
        {BRAND_NAME}
      </div>
    </div>
  );
}
