import type { Itinerary } from '../model/types';

interface ItineraryCardProps {
  itinerary: Itinerary;
  onClick: () => void;
}

export const ItineraryCard = ({ itinerary, onClick }: ItineraryCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-gradient-to-br from-brand-primary/10 via-white to-brand-tertiary/10 rounded-2xl p-10 border border-brand-primary/30 hover:border-brand-secondary hover:shadow-brand-lg transition-all duration-300 cursor-pointer overflow-hidden min-h-[280px] flex flex-col items-center justify-center text-center"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-tertiary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10 space-y-4">
        <div className="inline-flex items-center justify-center px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-brand-secondary/20 mb-2">
          <span className="text-sm font-semibold text-brand-secondary">
            {itinerary.locations.length}개 장소
          </span>
        </div>

        <h3 className="text-3xl font-bold text-text-primary group-hover:text-brand-secondary transition-colors leading-tight">
          {itinerary.title}
        </h3>

        {itinerary.description && (
          <p className="text-lg text-text-secondary leading-relaxed line-clamp-3 max-w-md mx-auto">
            {itinerary.description}
          </p>
        )}
      </div>
    </div>
  );
};
