import { createFileRoute, Navigate } from '@tanstack/react-router';
import { ErrorBoundary } from '@/shared/ui';
import { ContentOverviewHero } from '@/features/ContentOverviewHero';
import { LocationImageCarousel } from '@/features/LocationImageCarousel';
import { getContentDetail } from '@/entities/content/api/contentApi';

export const Route = createFileRoute('/content/$id')({
  loader: async ({ params }) => {
    const data = await getContentDetail(params.id).catch(() => null);
    if (!data) {
      throw new Error('NotFound');
    }
    return data;
  },
  errorComponent: () => <Navigate to="/not-found" />,
  component: ContentDetailPage,
});

function ContentDetailPage() {
  const { id } = Route.useParams();

  return (
    <ErrorBoundary>
      <ContentOverviewHero contentId={id} />
      <ErrorBoundary>
        <LocationImageCarousel contentId={id} />
      </ErrorBoundary>
    </ErrorBoundary>
  );
}
