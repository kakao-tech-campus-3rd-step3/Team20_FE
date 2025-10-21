import { Modal } from '@/features/Modal/ui/Modal';
import { messages } from '../model/messages';
import type { ItineraryDetailModalProps } from '../model/types';

export const ItineraryDetailModal = ({ itinerary, isOpen, onClose }: ItineraryDetailModalProps) => {
  if (!itinerary) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="-m-6">
        <div className="px-8 pt-7 pb-6 border-b border-gray-100">
          <div className="text-[15px] text-gray-500 mb-3">{formatDate(itinerary.createdAt)}</div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">{itinerary.title}</h1>
          {itinerary.description && (
            <p className="text-gray-600 text-base leading-relaxed">{itinerary.description}</p>
          )}
        </div>

        <div className="px-8 py-7">
          <div className="space-y-4">
            {itinerary.locations.map((location, index) => {
              const isFirst = index === 0;
              const isLast = index === itinerary.locations.length - 1;

              return (
                <div key={location.locationId} className="flex gap-5">
                  <div className="flex flex-col items-center pt-1.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${isFirst
                        ? 'bg-blue-600 text-white'
                        : isLast
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}
                    >
                      {index + 1}
                    </div>
                    {!isLast && <div className="w-[1.5px] h-full bg-gray-200 mt-2.5 mb-1"></div>}
                  </div>

                  <div className="flex-1 pb-1 min-w-0">
                    <div className="flex items-baseline gap-2.5 mb-1.5">
                      <h3 className="font-semibold text-gray-900 text-lg">{location.name}</h3>
                      {isFirst && (
                        <span className="text-xs text-blue-600 font-medium whitespace-nowrap">
                          {messages.startLabel}
                        </span>
                      )}
                      {isLast && (
                        <span className="text-xs text-gray-900 font-medium whitespace-nowrap">
                          {messages.endLabel}
                        </span>
                      )}
                    </div>
                    <p className="text-[15px] text-gray-500 leading-relaxed break-words">{location.address}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-8 pb-7 pt-2 flex gap-3">
          <button className="flex-1 h-12 bg-brand-secondary text-white text-base font-medium rounded-lg hover:bg-brand-secondary/90 transition-colors">
            {messages.viewOnMap}
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-12 bg-white border-2 border-gray-300 text-gray-700 text-base font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            {messages.closeModal}
          </button>
        </div>
      </div>
    </Modal>
  );
};
