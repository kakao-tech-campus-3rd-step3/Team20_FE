import type { LocationImageContentProps } from '../model/types';

export function LocationImageContent({ scene }: LocationImageContentProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-8">
      <div className="max-w-2xl">
        {scene.episode && (
          <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full mb-3">
            {scene.episode}
          </span>
        )}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{scene.title}</h3>
        <p className="text-white/90 leading-relaxed mb-2">{scene.description}</p>
        {scene.timestamp && <p className="text-white/70 text-sm">{scene.timestamp}</p>}
      </div>
    </div>
  );
}
