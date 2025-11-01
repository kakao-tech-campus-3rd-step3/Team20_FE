import { ContentOverviewHero } from '@/features/ContentOverviewHero';
import { LocationImageCarousel } from '@/features/LocationImageCarousel';
import { getContentDetail } from '@/entities/content/api/contentApi';
import type { Metadata } from 'next';

interface ContentDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ContentDetailPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const content = await getContentDetail(id);
    
    return {
      title: `${content.title} - K-SPOT`,
      description: content.description,
      openGraph: {
        title: `${content.title} - K-SPOT`,
        description: content.description,
        images: [content.posterImageUrl],
        type: 'website',
      },
    };
  } catch {
    return {
      title: '콘텐츠 상세 - K-SPOT',
      description: 'K-콘텐츠 촬영지 정보를 확인해보세요',
    };
  }
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
