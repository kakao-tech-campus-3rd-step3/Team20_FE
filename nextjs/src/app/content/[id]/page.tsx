import { ContentOverviewHero } from '@/features/ContentOverviewHero';
import { LocationImageCarousel } from '@/features/LocationImageCarousel';
import { getContentDetail } from '@/entities/content/api/contentApi';
import type { Metadata } from 'next';

interface ContentDetailPageProps {
  params: Promise<{ id: string }>;
}
export const revalidate = false;

export async function generateMetadata({ params }: ContentDetailPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const data = await getContentDetail(id);

    return {
      title: `${data.title} - K-SPOT`,
      description: data.description || `${data.title}의 촬영지를 탐험해보세요.`,
      openGraph: {
        title: `${data.title} - K-SPOT`,
        description: data.description || `${data.title}의 촬영지를 탐험해보세요.`,
        images: [data.posterImageUrl],
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
  return [];
}

export default async function ContentDetailPage({ params }: ContentDetailPageProps) {
  const { id } = await params;

  return (
    <div>
      <ContentOverviewHero contentId={id} />
      <LocationImageCarousel contentId={id} />
    </div>
  );
}
