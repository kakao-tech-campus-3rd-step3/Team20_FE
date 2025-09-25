import { useParams } from 'react-router-dom';
import { ContentOverviewHero } from '@/features/ContentOverviewHero';
import { LocationImageCarousel } from '@/features/LocationImageCarousel';

export function ContentDetailPage() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    // TODO: Not Found페이지 구현
    return null;
  }
  const contentId = id;

  return (
    <div>
      <ContentOverviewHero contentId={contentId} />
      <LocationImageCarousel contentId={contentId} />
    </div>
  );
}
