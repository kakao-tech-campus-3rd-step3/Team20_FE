'use client';

import { useState } from 'react';
import { useLocationImageCarousel } from '../../hooks/useLocationImageCarousel';
import { LocationImageHeader } from '../LocationImageHeader/LocationImageHeader';
import { LocationImageGallery } from '../LocationImageGallery/LocationImageGallery';
import { LocationImageThumbnails } from '../LocationImageThumbnails/LocationImageThumbnails';
import { LocationImageActionButton } from '../LocationImageActionButton/LocationImageActionButton';
import type { LocationDetail } from '@/entities/location/model/types';
import type { ContentLocation } from '@/entities/content/model/types';

interface LocationImageCarouselClientProps {
  locations: LocationDetail[];
  contentLocations: ContentLocation[];
}

export function LocationImageCarouselClient({
  locations,
  contentLocations,
}: LocationImageCarouselClientProps) {
  const [showAllThumbnails, setShowAllThumbnails] = useState(false);

  const { scenes, currentIndex, nextSlide, prevSlide, goToSlide } = useLocationImageCarousel({
    locations,
    contentLocations,
  });

  const handleToggleThumbnails = () => {
    setShowAllThumbnails(!showAllThumbnails);
  };

  const displayScenes = showAllThumbnails ? scenes : scenes.slice(0, 4);

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
          scenes={displayScenes}
          currentIndex={currentIndex}
          onGoToSlide={goToSlide}
        />

        {scenes.length > 4 && (
          <LocationImageActionButton onClick={handleToggleThumbnails} showAll={showAllThumbnails} />
        )}
      </div>
    </section>
  );
}
