import type { LocationDescriptionProps } from '../model/types';

export function LocationDescription({ description }: LocationDescriptionProps) {
  return (
    <section className="max-w-6xl mx-auto">
      <article className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-blue-600 rounded-full mr-4"></div>
            장소 소개
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-line">{description}</p>
          </div>
        </div>
      </article>
    </section>
  );
}
