'use client';

import { useLocationImageCarousel } from '../../hooks/useLocationImageCarousel';
import { useLocationData } from '../../hooks/useLocationData';
import { LocationImageHeader } from '../LocationImageHeader/LocationImageHeader';
import { LocationImageGallery } from '../LocationImageGallery/LocationImageGallery';
import { LocationImageThumbnails } from '../LocationImageThumbnails/LocationImageThumbnails';
import { LocationImageActionButton } from '../LocationImageActionButton/LocationImageActionButton';
import type { LocationImageCarouselProps } from '../../model/types';

export function LocationImageCarousel({ contentId }: LocationImageCarouselProps) {
  const { locations } = useLocationData(contentId);

  const { scenes, currentIndex, nextSlide, prevSlide, goToSlide } = useLocationImageCarousel({
    locations,
  });

  if (scenes.length === 0) {
    return (
      <section className="py-(--spacing-16) bg-gradient-to-b from-(--color-gray-800) to-(--color-gray-900)">
        <div className="max-w-7xl mx-auto px-(--spacing-4) sm:px-(--spacing-6) lg:px-(--spacing-8)">
          <div className="text-center text-white">
            <p>촬영지 정보가 없습니다.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-(--spacing-16) bg-gradient-to-b from-(--color-gray-800) to-(--color-gray-900)">
      <div className="max-w-7xl mx-auto px-(--spacing-4) sm:px-(--spacing-6) lg:px-(--spacing-8)">
        <LocationImageHeader />

        <LocationImageGallery
          currentIndex={currentIndex}
          onPrev={prevSlide}
          onNext={nextSlide}
          onGoToSlide={goToSlide}
          scenes={scenes}
        />

        <LocationImageThumbnails
          scenes={scenes}
          currentIndex={currentIndex}
          onGoToSlide={goToSlide}
        />

        <LocationImageActionButton />
      </div>
    </section>
  );
}
