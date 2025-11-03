import { IconButton } from '@/shared/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { LocationImageNavButtonProps } from '../../model/types';

export function LocationImageNavButton({
  onClick,
  icon: Icon,
  position,
}: LocationImageNavButtonProps) {
  const positionClass = position === 'left' ? 'left-[var(--spacing-4)]' : 'right-[var(--spacing-4)]';

  return (
    <IconButton
      Icon={Icon === ChevronLeft ? ChevronLeft : ChevronRight}
      shape="circle"
      size="lg"
      className={`absolute ${positionClass} top-1/2 -translate-y-1/2 bg-[var(--color-background-tertiary)]/20 backdrop-blur-sm hover:bg-[var(--color-background-tertiary)]/30`}
      onClick={onClick}
    />
  );
}
