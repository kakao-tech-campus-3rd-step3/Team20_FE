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
      className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-violet-100 to-cyan-100 rounded-full">
          <svg
            className="w-4 h-4 text-brand-secondary mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <span className="text-brand-secondary text-sm font-semibold">
            {itinerary.locations.length}개 장소
          </span>
        </div>
        <span className="text-sm text-gray-500">{formatDate(itinerary.createdAt)}</span>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-secondary transition-colors duration-300">
        {itinerary.title}
      </h3>

      <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">{itinerary.description}</p>

      <div className="flex items-center flex-wrap gap-2 mb-6">
        {itinerary.locations.slice(0, 3).map((location, index) => (
          <div key={location.locationId} className="flex items-center">
            <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
              {location.name}
            </span>
            {index < Math.min(itinerary.locations.length - 1, 2) && (
              <svg
                className="w-4 h-4 text-gray-400 mx-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </div>
        ))}
        {itinerary.locations.length > 3 && (
          <span className="text-sm text-gray-500">외 {itinerary.locations.length - 3}곳</span>
        )}
      </div>

      <div className="flex items-center justify-center text-brand-secondary font-medium text-sm pt-4 border-t border-gray-100">
        <span>클릭하여 자세히 보기</span>
        <svg
          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </div>
  );
};
