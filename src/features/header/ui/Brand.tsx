import { Sparkles } from 'lucide-react';

export function Brand() {
  return (
    <a href="/" className="flex items-center space-x-3 group">
      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
        <Sparkles className="w-6 h-6 text-white" />
      </div>
      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        K-SPOT
      </div>
    </a>
  );
}
