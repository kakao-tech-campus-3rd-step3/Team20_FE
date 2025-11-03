import type { LocationImageIndicatorsProps } from '../../model/types';
import { messages } from '../../model/messages';

export function LocationImageIndicators({
  total,
  currentIndex,
  onGoToSlide,
}: LocationImageIndicatorsProps) {
  if (total <= 1) return null;

  return (
    <div className="flex justify-center space-x-[var(--spacing-2)] mt-[var(--spacing-6)]">
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          onClick={() => onGoToSlide(index)}
          className={`
            w-[var(--spacing-3)] h-[var(--spacing-3)] rounded-full transition-all duration-300 
            ${index === currentIndex ? 'bg-[var(--color-brand-secondary)] scale-125' : 'bg-[var(--color-gray-500)] hover:bg-[var(--color-gray-400)]'}
          `}
          aria-label={`${messages.slideTo} ${index + 1}`}
        />
      ))}
    </div>
  );
}
