import type { LocationImageCounterProps } from '../model/types';

export function LocationImageCounter({ current, total }: LocationImageCounterProps) {
  return (
    <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
      {current} / {total}
    </div>
  );
}
