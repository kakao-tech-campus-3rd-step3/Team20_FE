import { createFileRoute } from '@tanstack/react-router';
import { ContentOverviewHero } from '@/features/ContentOverviewHero';
import { LocationImageCarousel } from '@/features/LocationImageCarousel';

export const Route = createFileRoute('/content/$id')({
  component: ContentDetailPage,
});

function ContentDetailPage() {
  const { id } = Route.useParams();

  return (
    <div>
      <ContentOverviewHero contentId={id} />
      <LocationImageCarousel contentId={id} />
    </div>
  );
}
