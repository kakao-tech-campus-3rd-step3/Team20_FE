import { createFileRoute } from '@tanstack/react-router';
import { useLocationDetail } from '@/entities/location/api/queryfn';
import {
  LocationHero,
  LocationDescription,
  LocationRelatedContents,
} from '@/features/LocationDetail';
import { quickFacts } from '@/features/LocationDetail/model/constants';

export const Route = createFileRoute('/location/$id')({
  component: LocationDetailPage,
});

function LocationDetailPage() {
  const { id } = Route.useParams();
  const { data, isLoading } = useLocationDetail(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-2xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            위치 정보를 찾을 수 없습니다
          </h2>
          <p className="text-gray-500">다시 시도해 주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative">
        <LocationHero location={data} />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-12">
        {/* Description Section */}
        <div className="transform -mt-8 relative z-10">
          <LocationDescription description={data.description ?? ''} quickFacts={quickFacts} />
        </div>

        {/* Related Contents Section */}
        <div className="relative z-10">
          <LocationRelatedContents relatedContents={data.relatedContents ?? []} />
        </div>
      </main>

      {/* Bottom Spacing */}
      <div className="h-16"></div>
    </div>
  );
}
