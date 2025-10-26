import { messages } from '../model/messages';
import type { ItineraryListProps } from '../model/types';
import { ItineraryCard } from './ItineraryCard';

export const ItineraryList = ({ itineraries, onItineraryClick }: ItineraryListProps) => {
  if (itineraries.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="w-24 h-24 bg-gradient-to-br from-brand-primary/20 to-brand-tertiary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-brand-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">{messages.emptyTitle}</h3>
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">{messages.emptyDescription}</p>
        <button className="bg-gradient-to-r from-brand-primary to-brand-tertiary text-brand-secondary px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-brand-primary/25 transition-all duration-300 transform hover:scale-105">
          {messages.createItinerary}
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {itineraries.map((itinerary) => (
        <ItineraryCard
          key={itinerary.itineraryId}
          itinerary={itinerary}
          onClick={() => onItineraryClick(itinerary)}
        />
      ))}
    </div>
  );
};