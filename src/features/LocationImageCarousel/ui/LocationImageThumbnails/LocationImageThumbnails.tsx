import type { LocationImageThumbnailsProps } from '../../model/types';

export function LocationImageThumbnails({
  scenes,
  currentIndex,
  onGoToSlide,
}: LocationImageThumbnailsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-(--spacing-4)">
      {scenes.map((scene, index) => (
        <div
          key={scene.id}
          onClick={() => onGoToSlide(index)}
          className={`relative aspect-video rounded-(--radius-xl) overflow-hidden cursor-pointer transition-all duration-300 ${
            index === currentIndex
              ? 'ring-2 ring-(--color-brand-secondary) scale-105'
              : 'hover:scale-105 hover:shadow-(--shadow-lg)'
          }`}
        >
          <img src={scene.image} alt={scene.title} className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-(--color-gray-900)/20 hover:bg-(--color-gray-900)/40 transition-colors" />

          <div className="absolute top-(--spacing-2) right-(--spacing-2) bg-(--color-brand-secondary)/90 backdrop-blur-sm text-(--color-text-inverse) text-caption px-(--spacing-2) py-(--spacing-1) rounded">
            {scene.episode}
          </div>

          <div className="absolute bottom-(--spacing-2) left-(--spacing-2) text-(--color-text-inverse) text-caption font-medium bg-(--color-gray-900)/50 px-(--spacing-2) py-(--spacing-1) rounded">
            {index + 1}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-(--spacing-3) bg-gradient-to-t from-(--color-gray-900)/80 to-transparent">
            <h4 className="text-(--color-text-inverse) text-body-small font-medium truncate">
              {scene.title}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}
