import { ContentOverviewHero } from '@/features/ContentOverviewHero';
import { LocationImageCarousel } from '@/features/LocationImageCarousel';
import { getContentDetail, getContentLocations } from '@/entities/content/api/contentApi';
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
  
  // 서버에서 데이터 미리 페칭
  const [contentDetail, contentLocations] = await Promise.all([
    getContentDetail(id),
    getContentLocations(id),
  ]);
  
  return (
    <div>
      <ContentOverviewHero 
        contentDetail={contentDetail}
        contentLocations={contentLocations}
      />
      <LocationImageCarousel contentId={id} />
    </div>
  );
}
