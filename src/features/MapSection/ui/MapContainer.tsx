import type { MapContainerProps } from '../model/types';

export function MapContainer({ className }: MapContainerProps) {
  return (
    <div
      className={`relative w-full h-full min-h-[600px] bg-gray-100 overflow-hidden ${
        className ?? ''
      }`}
    >
      <div className="absolute inset-0 flex items-center justify-center text-gray-500 select-none">
        지도 영역 Placeholder
      </div>
    </div>
  );
}
