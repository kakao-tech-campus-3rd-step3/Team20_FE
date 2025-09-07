import type { CitySelectorProps } from '../model/types';

export function CitySelector({ cities, selected, onSelect }: CitySelectorProps) {
  return (
    <div className="flex gap-2">
      {cities.map((city) => (
        <button
          key={city}
          onClick={() => onSelect(city)}
          className={`px-3 py-1 rounded-full text-sm transition ${
            selected === city ? 'bg-gray-900 text-white' : 'border hover:bg-gray-50'
          }`}
        >
          {city}
        </button>
      ))}
    </div>
  );
}
