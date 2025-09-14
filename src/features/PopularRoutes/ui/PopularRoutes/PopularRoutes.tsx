import { sampleRoutes } from '../../model/constants';
import { messages } from '../../model/messages';
import { Link } from 'react-router-dom';

export function PopularRoutes() {
  return (
    <section className="py-[var(--spacing-8)]">
      <div className="flex items-center justify-between mb-[var(--spacing-4)]">
        <h2 className="text-heading-4 text-[var(--color-text-primary)]">
          {messages.popularRoutesTitle}
        </h2>
        <Link to="/routes" className="text-link text-[var(--color-text-secondary)]">
          {messages.seeAll}
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-[var(--spacing-4)]">
        {sampleRoutes.map((route) => (
          <article
            key={route.id}
            className="rounded-2xl border border-[var(--color-border-primary)] bg-[var(--color-background-primary)] overflow-hidden hover:shadow-[var(--shadow-card)] transition duration-200"
          >
            <div className="h-28 bg-gradient-to-r from-[var(--color-gray-100)] to-[var(--color-gray-200)]" />
            <div className="p-[var(--spacing-4)] flex items-center justify-between">
              <div>
                <h3 className="font-medium text-[var(--color-text-primary)]">{route.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {route.spots} {messages.spots}
                </p>
              </div>
              <Link
                to={`/routes/${route.id}`}
                className="px-[var(--spacing-button-padding-x)] py-[var(--spacing-button-padding-y)] rounded-lg border border-[var(--color-border-primary)] text-button text-[var(--color-text-primary)] bg-[var(--color-background-primary)] hover:bg-[var(--color-background-secondary)] transition duration-200"
              >
                {messages.share}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
