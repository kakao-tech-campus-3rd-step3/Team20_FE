'use client';

import type { MapContainerUiProps } from '../../model/types';

export function MapContainer({
  containerRef,
  className,
  ariaLabel = '카카오 지도',
}: MapContainerUiProps) {
  return (
    <div
      className={[
        'relative w-full h-full min-h-[600px] bg-[var(--color-background-tertiary)] overflow-hidden',
        className ?? '',
      ].join(' ')}
    >
      <div ref={containerRef} className="absolute inset-0" role="region" aria-label={ariaLabel} />
    </div>
  );
}
