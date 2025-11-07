import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '지도 검색 - K-SPOT',
  description: 'K-콘텐츠 촬영지를 지도에서 검색하고 나만의 동선을 계획해보세요',
  keywords: ['지도', '검색', '촬영지', '동선계획', '여행'],
  openGraph: {
    title: '지도 검색 - K-SPOT',
    description: 'K-콘텐츠 촬영지를 지도에서 검색하고 나만의 동선을 계획해보세요',
    type: 'website',
  },
};

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

