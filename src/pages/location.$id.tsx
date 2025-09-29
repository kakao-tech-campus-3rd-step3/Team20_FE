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
  const { data } = useLocationDetail(id);

  if (!data) return null;

  return (
    <>
      <LocationHero location={data} />
      <LocationDescription description={data.description} quickFacts={quickFacts} />
      <LocationRelatedContents relatedContents={data.relatedContents} />
    </>
  );
}
