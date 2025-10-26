import { LocationDetail } from '@/features/LocationDetail';
import { getLocationDetail } from '@/entities/location/api/locationApi';
import type { Metadata } from 'next';

interface LocationDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: LocationDetailPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const location = await getLocationDetail(id);
    
    return {
      title: `${location.name} - K-SPOT`,
      description: location.description || `${location.name} 촬영지 정보를 확인해보세요`,
      openGraph: {
        title: `${location.name} - K-SPOT`,
        description: location.description || `${location.name} 촬영지 정보를 확인해보세요`,
        type: 'website',
      },
    };
  } catch {
    return {
      title: '장소 상세 - K-SPOT',
      description: 'K-콘텐츠 촬영지 정보를 확인해보세요',
    };
  }
}

export default async function LocationDetailPage({ params }: LocationDetailPageProps) {
  const { id } = await params;
  
  return (
    <div>
      <LocationDetail locationId={id} />
    </div>
  );
}
