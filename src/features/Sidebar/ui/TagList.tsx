export function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1">
      {tags.slice(0, 2).map((tag) => (
        <span
          key={tag}
          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
        >
          {tag}
        </span>
      ))}
      {tags.length > 2 && (
        <span className="text-xs text-gray-400">+{tags.length - 2}</span>
      )}
    </div>
  );
}
