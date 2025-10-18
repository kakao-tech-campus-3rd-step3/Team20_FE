import type { MapContainerUiProps } from '../../model/types';
import { cn } from '@/shared/lib';

export function MapContainer({
  containerRef,
  className,
  ariaLabel = '카카오 지도',
}: MapContainerUiProps) {
  return (
    <div
      className={cn(
        'relative w-full h-full min-h-[600px] bg-(--color-background-tertiary) overflow-hidden',
        className,
      )}
    >
      <div ref={containerRef} className="absolute inset-0" role="region" aria-label={ariaLabel} />
    </div>
  );
}
