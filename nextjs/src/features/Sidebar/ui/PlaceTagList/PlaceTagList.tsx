export function PlaceTagList({ tags }: { tags: string[] }) {
  return (
    <div className="mt-[var(--spacing-2)] flex flex-wrap gap-[var(--spacing-1)]">
      {tags.slice(0, 2).map((tag) => (
        <span
          key={tag}
          className="px-[var(--spacing-2)] py-[var(--spacing-1)] bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)] text-caption rounded-md"
        >
          {tag}
        </span>
      ))}
      {tags.length > 2 && (
        <span className="text-caption text-[var(--color-text-tertiary)]">+{tags.length - 2}</span>
      )}
    </div>
  );
}
