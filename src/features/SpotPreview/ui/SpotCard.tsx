import { messages } from '../model/messages';

export function SpotCard() {
  return (
    <div className="p-4 bg-white">
      <h3 className="font-semibold mb-3">{messages.selectedSpotTitle}</h3>
      <div className="flex gap-3">
        <div className="h-20 w-28 rounded-lg bg-gray-100" />
        <div className="flex-1">
          <p className="text-sm font-medium">{messages.sampleSpotName}</p>
          <p className="text-xs text-gray-600">{messages.sampleSpotMeta}</p>
          <div className="mt-2 flex gap-2">
            <a href="/save" className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-50">
              {messages.save}
            </a>
            <a
              href="/map/directions"
              className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-50"
            >
              {messages.directions}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
