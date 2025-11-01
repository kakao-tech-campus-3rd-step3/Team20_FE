'use client';

import React from 'react';
import { ContentOverviewHero } from '@/features/ContentOverviewHero';
import { LocationImageCarousel } from '@/features/LocationImageCarousel';

interface ContentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ContentDetailPage({ params }: ContentDetailPageProps) {
  const unwrappedParams = React.use(params);
  const { id } = unwrappedParams;

  return (
    <div>
      <ContentOverviewHero contentId={id} />
      <LocationImageCarousel contentId={id} />
    </div>
  );
}
