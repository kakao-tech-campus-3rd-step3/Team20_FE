import type { LocationImageIndicatorsProps } from '../model/types';

export function LocationImageIndicators({
  total,
  currentIndex,
  onGoToSlide,
}: LocationImageIndicatorsProps) {
  if (total <= 1) return null;

  return (
    <div className="flex justify-center space-x-2 mt-6">
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          onClick={() => onGoToSlide(index)}
          className={`
            w-3 h-3 rounded-full transition-all duration-300 
            ${index === currentIndex ? 'bg-red-600 scale-125' : 'bg-gray-500 hover:bg-gray-400'}
          `}
          aria-label={`슬라이드 ${index + 1}로 이동`}
        />
      ))}
    </div>
  );
}
