import type { LocationImageNavButtonProps } from '../model/types';

export function LocationImageNavButton({
  onClick,
  icon: Icon,
  position,
}: LocationImageNavButtonProps) {
  const positionClass = position === 'left' ? 'left-4' : 'right-4';

  return (
    <button
      onClick={onClick}
      className={`
        absolute ${positionClass} top-1/2 -translate-y-1/2 
        p-3 bg-white/20 backdrop-blur-sm rounded-full 
        hover:bg-white/30 transition-colors duration-200
      `}
    >
      <Icon className="w-6 h-6 text-white" />
    </button>
  );
}
