import { Modal } from '@/features/Modal/ui/Modal';
import type { Itinerary } from '../model/types';

interface ItineraryDetailModalProps {
  itinerary: Itinerary | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ItineraryDetailModal = ({
  itinerary,
  isOpen,
  onClose,
}: ItineraryDetailModalProps) => {
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
      <div className="relative bg-gradient-to-br from-amber-50 via-white to-orange-50 -m-6 mb-6 p-8 border-b-2 border-dashed border-amber-200">
        <div className="absolute top-0 left-8 w-16 h-16 bg-amber-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-8 w-20 h-20 bg-orange-100 rounded-full blur-3xl opacity-50"></div>

        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-amber-200">
              <svg
                className="w-5 h-5 text-amber-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-amber-900 font-semibold">
                {formatDate(itinerary.createdAt)}
              </span>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'serif' }}>
            {itinerary.title}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'serif' }}>
            {itinerary.description}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {itinerary.locations.map((location, index) => (
          <div key={location.locationId} className="relative">
            {index < itinerary.locations.length - 1 && (
              <div className="absolute left-6 top-24 bottom-0 w-0.5 bg-gradient-to-b from-amber-300 to-orange-300 translate-y-2"></div>
            )}

            <div className="relative bg-white rounded-2xl border-2 border-amber-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div
                className={`absolute -left-4 -top-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg ${
                  index === 0
                    ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white'
                    : index === itinerary.locations.length - 1
                      ? 'bg-gradient-to-br from-rose-400 to-pink-500 text-white'
                      : 'bg-gradient-to-br from-amber-400 to-orange-500 text-white'
                }`}
              >
                {location.visitOrder}
              </div>

              <div className="ml-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'serif' }}>
                    {location.name}
                  </h3>
                  {index === 0 && (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                      🚩 출발
                    </span>
                  )}
                  {index === itinerary.locations.length - 1 && (
                    <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-semibold">
                      🏁 도착
                    </span>
                  )}
                </div>

                <div className="bg-amber-50/50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                  <p className="text-gray-700 leading-relaxed flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {location.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t-2 border-dashed border-amber-200">
        <button className="px-6 py-3 bg-gradient-to-r from-violet-500 to-brand-secondary text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
          🗺️ 지도에서 보기
        </button>
        <button className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all duration-200">
          ✏️ 동선 수정
        </button>
      </div>
    </Modal>
  );
};
