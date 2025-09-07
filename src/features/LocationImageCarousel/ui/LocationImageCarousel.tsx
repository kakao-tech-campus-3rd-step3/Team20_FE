import { useLocationImageCarousel } from '../hooks/useLocationImageCarousel';
import { LocationImageHeader } from './LocationImageHeader';
import { LocationImageGallery } from './LocationImageGallery';
import { LocationImageThumbnails } from './LocationImageThumbnails';
import { LocationImageActionButton } from './LocationImageActionButton';

export function LocationImageCarousel() {
  const { scenes, currentIndex, nextSlide, prevSlide, goToSlide } = useLocationImageCarousel();

  return (
    <section className="py-16 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
