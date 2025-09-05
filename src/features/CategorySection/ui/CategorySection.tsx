import { categories } from '@/features/CategorySection/model/Categories';

export function CategorySection() {
  return (
    <section className="py-10 grid md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <a href={category.href} className="rounded-2xl border p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-bold">{category.title}</h3>
          <p className="text-gray-600">{category.desc}</p>
        </a>
      ))}
    </section>
  );
}
