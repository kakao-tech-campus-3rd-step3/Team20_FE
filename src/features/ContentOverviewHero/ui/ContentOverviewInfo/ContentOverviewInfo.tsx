import type { ContentOverviewInfoProps } from '../../model/types';
import { messages } from '../../model/messages';

export function ContentOverviewInfo({
  title,
  category,
  description,
  countOfLocations,
}: ContentOverviewInfoProps) {
  return (
    <div className="absolute bottom-32 left-0 right-0 z-[--z-elevated] px-[--spacing-6]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-[--spacing-6] flex items-center justify-center gap-[--spacing-4]">
          <span
            className="
              px-[--spacing-6] py-[--spacing-3] 
              bg-gradient-to-r from-[--color-brand-secondary] to-[--color-brand-tertiary] 
              text-white text-sm font-semibold rounded-full
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
              <span className="text-white/90 text-sm font-medium">
                {messages.locationCount.replace('{count}', countOfLocations.toString())}
              </span>
            </div>
          )}
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-[--spacing-6] leading-tight">
          {title}
        </h1>

        <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}
