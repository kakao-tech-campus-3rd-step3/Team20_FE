import React from 'react';
import { MapPin } from 'lucide-react';

export const Address: React.FC<{ address: string }> = ({ address }) => {
  return (
    <div className="flex items-center text-gray-500 text-sm mb-2">
      <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
      <span className="truncate">{address}</span>
    </div>
  );
};
