export function PlaceTagList({ tags }: { tags: string[] }) {
  return (
    <div className="mt-(--spacing-2) flex flex-wrap gap-(--spacing-1)">
      {tags.slice(0, 2).map((tag) => (
        <span
          key={tag}
          className="px-(--spacing-2) py-(--spacing-1) bg-(--color-background-tertiary) text-(--color-text-secondary) text-caption rounded-md"
        >
          {tag}
        </span>
      ))}
      {tags.length > 2 && (
        <span className="text-caption text-(--color-text-tertiary)">
          +{tags.length - 2}
        </span>
      )}
    </div>
  );
}
