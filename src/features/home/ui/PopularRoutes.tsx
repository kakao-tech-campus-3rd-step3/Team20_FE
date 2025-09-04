import { sampleRoutes } from '@/features/home/model/data';
import { text } from '@/features/home/model/text';
export function PopularRoutes() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{text.popularRoutesTitle}</h2>
        <a href="/routes" className="text-sm text-gray-600 underline">
          {text.seeAll}
        </a>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {sampleRoutes.map((route) => (
          <article
            key={route.id}
            className="rounded-2xl border overflow-hidden hover:shadow-md transition"
          >
            <div className="h-28 bg-gradient-to-r from-gray-100 to-gray-200" />
            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">{route.title}</h3>
                <p className="text-sm text-gray-600">
                  {route.spots} {text.spots}
                </p>
              </div>
              <a
                href={`/routes/${route.id}`}
                className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-50"
              >
                {text.share}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
