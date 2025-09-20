import { Star, Clock } from 'lucide-react';

export function PlaceSimpleInfo({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-between text-body-small text-(--color-text-secondary)">
      <div className="flex items-center gap-(--spacing-1)">
        <Star className="w-3 h-3 text-(--color-semantic-warning)" fill="currentColor" />
        <span>{rating.toFixed(1)}</span>
      </div>
      <div className="flex items-center gap-(--spacing-1)">
        <Clock className="w-3 h-3 text-(--color-text-tertiary)" />
        <span>1-2시간</span>
      </div>
    </div>
  );
}
