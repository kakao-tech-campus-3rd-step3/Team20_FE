import type { LocationImageCounterProps } from '../../model/types';

export function LocationImageCounter({ current, total }: LocationImageCounterProps) {
  return (
    <div
      className="
        absolute top-[var(--spacing-4)] right-[var(--spacing-4)] px-[var(--spacing-3)] py-[var(--spacing-1)] bg-[var(--color-gray-900)]/50 backdrop-blur-sm 
        text-[var(--color-text-inverse)] text-body-small rounded-full"
    >
      {current} / {total}
    </div>
  );
}
