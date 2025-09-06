import { messages } from '../model/messages';

export function MapPreview({ city }: { city: string }) {
  return (
    <div className="h-72 md:h-full relative bg-[conic-gradient(at_30%_30%,#f8fafc,#e5e7eb,#f1f5f9,#e2e8f0,#f8fafc)]">
      <div className="absolute inset-0 grid place-items-center">
        <div className="px-3 py-1 rounded-full bg-white/80 backdrop-blur border text-gray-700">
          {messages.mapPreviewTitle} {city}
        </div>
      </div>
    </div>
  );
}
