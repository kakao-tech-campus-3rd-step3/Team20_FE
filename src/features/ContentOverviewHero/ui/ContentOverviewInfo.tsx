import type { ContentOverviewInfoProps } from '../model/types';

export function ContentOverviewInfo({
  title,
  category,
  description,
  countOfLocations,
}: ContentOverviewInfoProps) {
  return (
    <div className="absolute bottom-32 left-0 right-0 z-10 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6 flex items-center justify-center gap-4">
          <span
            className="
              px-6 py-3 
              bg-gradient-to-r from-pink-600 to-red-600 
              text-white text-sm font-semibold rounded-full
          "
          >
            {category}
          </span>
          {countOfLocations && (
            <div
              className="
                flex items-center gap-2 px-4 py-3 
                bg-white/10 rounded-full 
                border border-white/20
              "
            >
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-white/90 text-sm font-medium">
                {countOfLocations}개의 촬영지
              </span>
            </div>
          )}
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>

        <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}
