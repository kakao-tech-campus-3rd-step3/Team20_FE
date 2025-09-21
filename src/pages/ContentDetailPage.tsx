import { useParams } from 'react-router-dom';
import { ContentOverviewHero } from '@/features/ContentOverviewHero';
import { LocationImageCarousel } from '@/features/LocationImageCarousel';

export function ContentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const contentId = id ? parseInt(id, 10) : 0;

  return (
    <div>
      <ContentOverviewHero />
      <LocationImageCarousel contentId={contentId} />
    </div>
  );
}
