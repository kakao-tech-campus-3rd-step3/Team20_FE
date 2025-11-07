import type { LocationImageContentProps } from '../../model/types';

export function LocationImageContent({ scene }: LocationImageContentProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-[var(--spacing-8)]">
      <div className="max-w-2xl">
        {scene.episode && (
          <span className="inline-block px-[var(--spacing-3)] py-[var(--spacing-1)] bg-[var(--color-brand-secondary)] text-[var(--color-text-inverse)] text-body-small font-medium rounded-full mb-[var(--spacing-3)]">
            {scene.episode}
          </span>
        )}
        <h3 className="text-heading-3 md:text-heading-1 text-[var(--color-text-inverse)] text-balance mb-[var(--spacing-3)]">
          {scene.title}
        </h3>
        <p className="text-[var(--color-text-inverse)]/90 text-body-small sm:text-body md:text-body break-words mb-[var(--spacing-2)]">
          {scene.description}
        </p>
        {scene.timestamp && (
          <p className="text-[var(--color-text-inverse)]/70 text-body-small">{scene.timestamp}</p>
        )}
      </div>
    </div>
  );
}
