import {
  LocationHero,
  LocationDescription,
  LocationRelatedContents,
  LocationReviews,
} from '@/features/LocationDetail';
import { quickFacts } from '@/features/LocationDetail/model/constants';
import { getLocationDetail } from '@/entities/location/api/locationApi';
import { getLocationReviews } from '@/entities/location-review/api/locationReviewApi';
import { getPopularContents, getContentLocations } from '@/entities/content/api/contentApi';
import type { Metadata } from 'next';

interface LocationDetailPageProps {
  params: Promise<{ id: string }>;
}
export const revalidate = false;

export async function generateMetadata({ params }: LocationDetailPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const data = await getLocationDetail(id);

    return {
      title: `${data.name} - K-SPOT`,
      description: data.description || `${data.name}의 상세 정보를 확인하세요.`,
      openGraph: {
        title: `${data.name} - K-SPOT`,
        description: data.description || `${data.name}의 상세 정보를 확인하세요.`,
        images: data.locationImage ? [data.locationImage] : [],
      },
    };
  } catch (error) {
    console.error('Failed to generate metadata:', error);
    return {
      title: 'K-SPOT',
      description: 'K-콘텐츠 촬영지를 탐험해보세요.',
    };
  }
}
export const dynamicParams = true; 

export async function generateStaticParams() {
  try {
    const contents = await getPopularContents();
    const locationIds = new Set<string>();

    const topContents = contents.slice(0, 10);
    console.log(`[SSG] Fetching locations from ${topContents.length} contents...`);

    for (const content of topContents) {
      try {
        const locations = await getContentLocations(String(content.contentId));
        if (Array.isArray(locations)) {
          locations.forEach((loc) => locationIds.add(String(loc.locationId)));
        }
        await new Promise(resolve => setTimeout(resolve, 50));
      } catch {
        console.error(`Failed to fetch locations for content ${content.contentId}`);
      }
    }

    const locationArray = Array.from(locationIds);
    return locationArray.map((id) => ({ id }));
  } catch (error) {
    console.error('Failed to generate static params for locations:', error);
    return [];
  }
}

export default async function LocationDetailPage({ params }: LocationDetailPageProps) {
  const { id } = await params;
  const [data, reviewsData] = await Promise.all([
    getLocationDetail(id),
    getLocationReviews(id),
  ]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6">
        <div className="text-center max-w-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2 sm:mb-3">
            위치 정보를 찾을 수 없습니다
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">다시 시도해 주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="relative">
        <div className="mx-auto w-full max-w-7xl px-0 sm:px-0">
          <LocationHero location={data} />
        </div>
      </div>
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 space-y-8 sm:space-y-10 lg:space-y-12">
        <section className="transform -mt-6 sm:-mt-10 lg:-mt-12 relative z-10">
          <LocationDescription description={data.description ?? ''} quickFacts={quickFacts} />
        </section>
        <section className="relative z-10">
          <LocationRelatedContents relatedContents={data.relatedContents ?? []} />
        </section>
        <section className="relative z-10">
          <LocationReviews
            reviews={reviewsData?.locationReviews ?? []}
            isLoading={false}
            locationId={id}
          />
        </section>
      </main>
      <div className="h-10 sm:h-12 lg:h-16" />
    </div>
  );
}
