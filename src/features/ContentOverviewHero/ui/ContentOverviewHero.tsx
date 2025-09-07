import { contentHero } from '@/__mocks__/contentHero';
import { ContentOverviewIconGroup } from './ContentOverviewIconGroup';
import { ContentOverviewInfo } from './ContentOverviewInfo';
import { ContentOverviewActionButtons } from './ContentOverviewActionButtons';
import type { ContentOverviewHeroProps } from '../model/types';

export function ContentOverviewHero({
  title = contentHero.title,
  category = contentHero.category,
  description = contentHero.description,
  imageUrl = contentHero.imageUrl,
  countOfLocations = contentHero.countOfLocations,
  isLiked = false,
}: ContentOverviewHeroProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80" />
      </div>

      <ContentOverviewIconGroup isLiked={isLiked} />

      <ContentOverviewInfo
        title={title}
        category={category}
        description={description}
        countOfLocations={countOfLocations}
      />

      <ContentOverviewActionButtons />
    </div>
  );
}
