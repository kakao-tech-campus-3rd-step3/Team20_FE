import type { ButtonProps } from '../../model/types';
import { Link } from 'react-router-dom';

export function Button({ href, children, variant = 'primary' }: ButtonProps) {
  const baseStyles =
    'px-[var(--spacing-button-padding-x)] py-[var(--spacing-button-padding-y)] rounded-xl text-button transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-border-focus]';

  const primaryClasses =
    'bg-[var(--color-brand-secondary)] text-[var(--color-text-inverse)] shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-button-hover)]';

  const secondaryClasses =
    'border border-[var(--color-border-primary)] bg-[var(--color-background-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-background-secondary)] shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-button-hover)]';

  const variantClasses = variant === 'primary' ? primaryClasses : secondaryClasses;

  return (
    <Link to={href} className={`${baseStyles} ${variantClasses}`}>
      {children}
    </Link>
  );
}
