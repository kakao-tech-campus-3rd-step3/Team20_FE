import { text } from '@/features/PopularCarousel/model/text';
import { popularContents } from '@/features/PopularCarousel/model/data';
import { PosterCard } from '@/features/PopularCarousel/ui/PosterCard';

export function PopularCarousel() {
  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{text.popularNow}</h2>
        <a href="/trending" className="text-sm text-gray-600 underline">
          {text.seeAll}
        </a>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {popularContents.map((content) => (
          <PosterCard key={content.id} {...content} />
        ))}
      </div>
    </section>
  );
}
