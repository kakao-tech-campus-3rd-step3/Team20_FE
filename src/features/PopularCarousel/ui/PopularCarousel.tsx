import { messages } from '../model/messages';
import { popularContents } from '../model/constants';
import { PosterCard } from '../ui/PosterCard';
import { Link } from 'react-router-dom';

export function PopularCarousel() {
  return (
    <section className="py-[var(--spacing-8)]">
      <div className="flex items-center justify-between mb-[var(--spacing-4)]">
        <h2 className="text-heading-4 text-[var(--color-text-primary)]">{messages.popularNow}</h2>
        <Link to="/trending" className="text-link text-[var(--color-text-secondary)]">
          {messages.seeAll}
        </Link>
      </div>
      <div className="flex gap-[var(--spacing-4)] overflow-x-auto pb-[var(--spacing-2)] snap-x snap-mandatory">
        {popularContents.map((content) => (
          <PosterCard key={content.id} {...content} />
        ))}
      </div>
    </section>
  );
}
