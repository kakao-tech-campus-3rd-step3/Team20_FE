import { Star, Clock } from 'lucide-react';

export function PlaceSimpleInfo({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-between text-xs text-gray-500">
      <div className="flex items-center space-x-1">
        <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
        <span>{rating.toFixed(1)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Clock className="w-3 h-3" />
        <span>1-2시간</span>
      </div>
    </div>
  );
}
