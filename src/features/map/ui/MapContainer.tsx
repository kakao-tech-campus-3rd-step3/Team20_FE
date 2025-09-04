import React from 'react';
import type { MapContainerProps } from '@/features/map/model/types';

export const MapContainer: React.FC<MapContainerProps> = ({ className }) => {
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
};
