import type { LocationDescriptionProps } from '../model/types';

export function LocationDescription({ description, quickFacts }: LocationDescriptionProps) {
  return (
    <section className="max-w-6xl mx-auto">
      <article className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
        {/* Quick Facts Section */}
        {quickFacts?.length ? (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
              기본 정보
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-200"
                >
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    {fact.label}
                  </div>
                  <div className="text-gray-800 font-medium leading-relaxed">{fact.value}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Description Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-blue-600 rounded-full mr-4"></div>
            장소 소개
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
              {description}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
