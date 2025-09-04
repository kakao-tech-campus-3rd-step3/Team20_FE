import { text } from '@/features/home/model/text';

export default function Category() {
  return (
    <section className="py-10 grid md:grid-cols-3 gap-6">
      <a href="/category/k-drama" className="rounded-2xl border p-6 hover:shadow-lg transition">
        <h3 className="text-lg font-bold">K-Drama</h3>
        <p className="text-gray-600">{text.dramaTrending}</p>
      </a>
      <a href="/category/k-movie" className="rounded-2xl border p-6 hover:shadow-lg transition">
        <h3 className="text-lg font-bold">K-Movie</h3>
        <p className="text-gray-600">{text.movieTrending}</p>
      </a>
      <a href="/category/k-pop" className="rounded-2xl border p-6 hover:shadow-lg transition">
        <h3 className="text-lg font-bold">K-POP</h3>
        <p className="text-gray-600">{text.kpopTrending}</p>
      </a>
    </section>
  );
}
