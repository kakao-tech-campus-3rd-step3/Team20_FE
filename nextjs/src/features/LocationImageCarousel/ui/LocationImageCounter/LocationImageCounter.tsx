import type { LocationImageCounterProps } from '../../model/types';

export function LocationImageCounter({ current, total }: LocationImageCounterProps) {
  return (
    <div
      className="
        absolute top-(--spacing-4) right-(--spacing-4) px-(--spacing-3) py-(--spacing-1) bg-(--color-gray-900)/50 backdrop-blur-sm 
        text-(--color-text-inverse) text-body-small rounded-full"
    >
      {current} / {total}
    </div>
  );
}
