import type { LocationImageThumbnailsProps } from '../model/types';

export function LocationImageThumbnails({
  scenes,
  currentIndex,
  onGoToSlide,
}: LocationImageThumbnailsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {scenes.map((scene, index) => (
        <div
          key={scene.id}
          onClick={() => onGoToSlide(index)}
          className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
            index === currentIndex
              ? 'ring-2 ring-red-500 scale-105'
              : 'hover:scale-105 hover:shadow-lg'
          }`}
        >
          <img src={scene.image} alt={scene.title} className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors" />

          <div className="absolute top-2 right-2 bg-red-600/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
            {scene.episode}
          </div>

          <div className="absolute bottom-2 left-2 text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
            {index + 1}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
            <h4 className="text-white text-sm font-medium truncate">{scene.title}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}
