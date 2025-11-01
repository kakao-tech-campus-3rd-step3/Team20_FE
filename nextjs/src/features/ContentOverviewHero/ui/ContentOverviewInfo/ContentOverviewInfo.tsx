import type { ContentOverviewInfoProps } from '../../model/types';
import { messages } from '../../model/messages';

export function ContentOverviewInfo({
  title,
  category,
  description,
  countOfLocations,
}: ContentOverviewInfoProps) {
  return (
    <div className="px-[--spacing-16] py-[--spacing-8]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white/90 mb-12 leading-tight ">
          {title}
        </h1>
        <div className="mb-8 flex items-center justify-center gap-6">
          <span
            className="
              px-[--spacing-6] py-[--spacing-3] 
              bg-gradient-to-r from-[--color-brand-secondary] to-[--color-brand-tertiary] 
              text-white text-2xl font-semibold rounded-full
              shadow-[--shadow-brand-sm]
          "
          >
            {category}
          </span>
          {countOfLocations && (
            <div
              className="
                flex items-center gap-[--spacing-2] px-[--spacing-4] py-[--spacing-3] 
                bg-white/10 rounded-full 
                border border-white/20
                shadow-[--shadow-brand-sm]
              "
            >
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-white/90 text-2xl font-medium">
                {messages.locationCount.replace('{count}', countOfLocations.toString())}
              </span>
            </div>
          )}
        </div>

        <p className="text-white/90 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto mb-8">
          {description}
        </p>
      </div>
    </div>
  );
}
