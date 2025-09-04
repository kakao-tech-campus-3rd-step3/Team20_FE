interface Props {
  id: string;
  title: string;
  year: number;
  spots: number;
}

export function PosterCard({ id, title, year, spots }: Props) {
  return (
    <article className="min-w-[220px] snap-start rounded-xl border p-3 hover:shadow-md transition">
      <a href={`/content/${id}`} className="block">
        <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 grid place-items-cent text-gray-500 text-sm">
          Poster
        </div>
        <h3 className="mt-3 font-medium line-clamp-2" title={title}>
          {title}
        </h3>
        <p className="text-xs text-gray-500">{year}</p>
        <p className="text-sm text-gray-700 mt-1">{spots} spots</p>
      </a>
    </article>
  );
}
