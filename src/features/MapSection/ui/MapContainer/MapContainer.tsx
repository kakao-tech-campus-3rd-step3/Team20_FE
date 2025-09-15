import type { MapContainerProps } from '../../model/types';
import mockMap from '@/__mocks__/images/mock-map-screenshot.png';

export function MapContainer({ className }: MapContainerProps) {
  return (
    <div
      className={[
        'relative w-full h-full min-h-[600px] bg-(--color-background-tertiary) overflow-hidden',
        className ?? '',
      ].join(' ')}
    >
      <img
        src={mockMap}
        alt="Mock map"
        className="absolute inset-0 w-full h-full object-cover select-none"
        draggable={false}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-body text-(--color-text-inverse) bg-(--color-background-dark)/50 px-(--spacing-2) py-(--spacing-1) rounded">
          지도 영역 Mock
        </span>
      </div>
    </div>
  );
}
