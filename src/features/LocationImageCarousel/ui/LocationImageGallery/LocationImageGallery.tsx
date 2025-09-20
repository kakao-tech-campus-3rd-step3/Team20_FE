import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { LocationImageGalleryProps } from '../../model/types';
import { LocationImageNavButton } from '../LocationImageNavButton/LocationImageNavButton';
import { LocationImageContent } from '../LocationImageContent/LocationImageContent';
import { LocationImageCounter } from '../LocationImageCounter/LocationImageCounter';
import { LocationImageIndicators } from '../LocationImageIndicators/LocationImageIndicators';

export function LocationImageGallery({
  currentIndex,
  onPrev,
  onNext,
  onGoToSlide,
  scenes,
}: LocationImageGalleryProps) {
  if (!scenes.length || currentIndex < 0 || currentIndex >= scenes.length) {
    return null;
  }
  const currentScene = scenes[currentIndex];
  const hasMultipleScenes = scenes.length > 1;

  return (
    <div className="relative mb-(--spacing-12)">
      <div className="relative h-96 md:h-128 rounded-(--radius-3xl) overflow-hidden shadow-(--shadow-2xl)">
        <img
          src={currentScene.image}
          alt={currentScene.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-(--color-gray-900)/80 via-transparent to-transparent" />

        <LocationImageContent scene={currentScene} />

        {hasMultipleScenes && (
          <>
            <LocationImageNavButton onClick={onPrev} icon={ChevronLeft} position="left" />
            <LocationImageNavButton onClick={onNext} icon={ChevronRight} position="right" />
            <LocationImageCounter current={currentIndex + 1} total={scenes.length} />
          </>
        )}
      </div>

      <LocationImageIndicators
        total={scenes.length}
        currentIndex={currentIndex}
        onGoToSlide={onGoToSlide}
      />
    </div>
  );
}
