import { text } from '@/features/SpotPreview/model/text';
import { useState } from 'react';
export function SpotPreview() {
  const cities = ['All', 'Seoul', 'Busan', 'Incheon'] as const;
  const [selected, setSelected] = useState<(typeof cities)[number]>('All');
  return (
    <section className="py-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{text.mapSectionTitle}</h2>
        <div className="flex gap-2">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelected(city)}
              className={`px-3 py-1 rounded-full text-sm transition ${
                selected === city ? 'bg-gray-900 text-white' : 'border hover:bg-gray-50'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border overflow-hidden">
        <div className="grid md:grid-cols-[1.2fr_1fr]">
          <div className="h-72 md:h-full relative bg-[conic-gradient(at_30%_30%,#f8fafc,#e5e7eb,#f1f5f9,#e2e8f0,#f8fafc)]">
            <div className="absolute inset-0 grid place-items-center">
              <div className="px-3 py-1 rounded-full bg-white/80 backdrop-blur border text-gray-700">
                {text.mapPreviewTitle} {selected}
              </div>
            </div>
          </div>

          <div className="p-4 bg-white">
            <h3 className="font-semibold mb-3">{text.selectedSpotTitle}</h3>
            <div className="flex gap-3">
              <div className="h-20 w-28 rounded-lg bg-gray-100" />
              <div className="flex-1">
                <p className="text-sm font-medium">{text.sampleSpotName}</p>
                <p className="text-xs text-gray-600">{text.sampleSpotMeta}</p>
                <div className="mt-2 flex gap-2">
                  <a href="/save" className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-50">
                    {text.save}
                  </a>
                  <a
                    href="/map/directions"
                    className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-50"
                  >
                    {text.directions}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-right">
        <a href="/map" className="text-sm underline text-gray-700 hover:text-gray-900">
          {text.openFullMap}
        </a>
      </div>
    </section>
  );
}
