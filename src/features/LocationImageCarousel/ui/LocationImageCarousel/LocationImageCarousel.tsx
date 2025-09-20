import { useLocationImageCarousel } from '../../hooks/useLocationImageCarousel';
import { LocationImageHeader } from '../LocationImageHeader/LocationImageHeader';
import { LocationImageGallery } from '../LocationImageGallery/LocationImageGallery';
import { LocationImageThumbnails } from '../LocationImageThumbnails/LocationImageThumbnails';
import { LocationImageActionButton } from '../LocationImageActionButton/LocationImageActionButton';

export function LocationImageCarousel() {
  const { scenes, currentIndex, nextSlide, prevSlide, goToSlide } = useLocationImageCarousel();

  return (
    <section className="py-(--spacing-16) bg-gradient-to-b from-(--color-gray-950) to-(--color-gray-900)">
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
