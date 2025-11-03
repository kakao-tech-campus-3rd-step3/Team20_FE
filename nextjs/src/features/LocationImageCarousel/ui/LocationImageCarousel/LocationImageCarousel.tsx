import { getLocationDetail } from '@/entities/location/api/locationApi';
import { getContentLocations } from '@/entities/content/api/contentApi';
import type { LocationImageCarouselProps } from '../../model/types';
import { LocationImageCarouselClient } from './LocationImageCarouselClient';

export async function LocationImageCarousel({ contentId }: LocationImageCarouselProps) {
  try {
    const contentLocations = await getContentLocations(contentId);

    if (!contentLocations || !Array.isArray(contentLocations) || contentLocations.length === 0) {
      return (
        <section className="py-[var(--spacing-16)] bg-gradient-to-b from-[var(--color-gray-800)] to-[var(--color-gray-900)]">
          <div className="max-w-7xl mx-auto px-[var(--spacing-4)] sm:px-[var(--spacing-6)] lg:px-[var(--spacing-8)]">
            <div className="text-center text-white">
              <p>촬영지 정보가 없습니다.</p>
            </div>
          </div>
        </section>
      );
    }

    const locations = await Promise.all(
      contentLocations.map((location) => getLocationDetail(location.locationId.toString()))
    );

    return <LocationImageCarouselClient locations={locations} contentLocations={contentLocations} />;
  } catch (error) {
    console.error(`Failed to load locations for content ${contentId}:`, error);
    return (
      <section className="py-[var(--spacing-16)] bg-gradient-to-b from-[var(--color-gray-800)] to-[var(--color-gray-900)]">
        <div className="max-w-7xl mx-auto px-[var(--spacing-4)] sm:px-[var(--spacing-6)] lg:px-[var(--spacing-8)]">
          <div className="text-center text-white">
            <p>촬영지 정보를 불러올 수 없습니다.</p>
          </div>
        </div>
      </section>
    );
  }
}
