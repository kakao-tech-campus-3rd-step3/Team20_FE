import { useState } from 'react';
import { contentScenes } from '@/__mocks__/contentScenes';

export function useLocationImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scenes = contentScenes;

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
