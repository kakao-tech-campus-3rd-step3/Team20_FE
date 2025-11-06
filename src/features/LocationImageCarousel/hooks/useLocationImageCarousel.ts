import { useState } from 'react';
import type { UseLocationImageCarouselProps } from '../model/types';

export function useLocationImageCarousel({
  locations,
  contentLocations,
}: UseLocationImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scenes = locations.map((location, index) => {
    const contentLocation = contentLocations.find((cl) => cl.locationId === location.locationId);

    return {
      id: location.locationId,
      title: location.name,
      description: contentLocation?.sceneDescription || location.description || '',
      image: location.imageUrl?.[0] || '',
      address: location.address,
      episode: `${index + 1}번째 장소`,
      timestamp: '',
    };
  });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % scenes.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return {
    scenes,
    currentIndex,
    nextSlide,
    prevSlide,
    goToSlide,
  };
}
