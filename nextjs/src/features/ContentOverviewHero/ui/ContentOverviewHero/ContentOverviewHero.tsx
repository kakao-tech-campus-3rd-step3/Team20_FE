import type { ContentOverviewHeroProps } from '../../model/types';
import { getContentDetail, getContentLocations } from '@/entities/content/api/contentApi';
import { ContentOverviewHeroClient } from './ContentOverviewHeroClient';

export async function ContentOverviewHero({
  contentId
}: ContentOverviewHeroProps) {
  try {
    const [contentDetail, contentLocations] = await Promise.all([
      getContentDetail(contentId),
      getContentLocations(contentId),
    ]);

    const locationsCount = Array.isArray(contentLocations) ? contentLocations.length : 0;

    return (
      <ContentOverviewHeroClient
        contentDetail={contentDetail}
        contentLocationsCount={locationsCount}
      />
    );
  } catch (error) {
    console.error(`Failed to load content ${contentId}:`, error);
    throw error;
  }
}
