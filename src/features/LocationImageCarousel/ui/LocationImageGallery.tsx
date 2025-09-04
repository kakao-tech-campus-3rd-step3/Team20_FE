import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { LocationImageGalleryProps } from '../model/types';
import { LocationImageNavButton } from './LocationImageNavButton';
import { LocationImageContent } from './LocationImageContent';
import { LocationImageCounter } from './LocationImageCounter';
import { LocationImageIndicators } from './LocationImageIndicators';

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
    <div className="relative mb-12">
      <div className="relative h-96 md:h-[32rem] rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={currentScene.image}
          alt={currentScene.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

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
