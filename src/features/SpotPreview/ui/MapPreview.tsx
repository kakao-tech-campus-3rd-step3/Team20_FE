import { messages } from '../model/messages';

export function MapPreview({ city }: { city: string }) {
  return (
    <div className="h-72 md:h-full relative bg-[conic-gradient(at_30%_30%,var(--color-gray-50),var(--color-gray-200),var(--color-gray-100),var(--color-gray-200),var(--color-gray-50))]">
      <div className="absolute inset-0 grid place-items-center">
        <div className="px-[var(--spacing-button-padding-x)] py-[var(--spacing-button-padding-y)] rounded-full bg-[var(--color-background-primary)] backdrop-blur border border-[var(--color-border-primary)] text-[var(--color-text-primary)]">
          {messages.mapPreviewTitle} {city}
        </div>
      </div>
    </div>
  );
}
