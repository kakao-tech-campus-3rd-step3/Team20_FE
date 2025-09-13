import { categories } from '../model/constants';
import { Link } from 'react-router-dom';

export function CategorySection() {
  return (
    <section className="grid gap-6 md:grid-cols-3 px-[var(--spacing-container-padding)] md:px-[var(--spacing-container-padding-tablet)] lg:px-[var(--spacing-container-padding-desktop)]">
      {categories.map((category) => (
        <Link
          key={category.href}
          to={category.href}
          className="group rounded-2xl border border-[--color-border-primary] bg-[--color-background-primary] p-6 shadow-[var(--shadow-button)] transition-shadow duration-200 hover:shadow-[var(--shadow-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-border-focus]"
        >
          <h3 className="text-heading-5 text-[--color-text-primary] mb-1">{category.title}</h3>
          <p className="text-body-small text-[--color-text-secondary]">{category.desc}</p>
        </Link>
      ))}
    </section>
  );
}
