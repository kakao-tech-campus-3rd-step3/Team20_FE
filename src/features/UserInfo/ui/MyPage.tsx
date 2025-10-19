import { useState } from 'react';
import { useMyPageData } from '../hooks/useMyPageData';
import { UserProfile } from './UserProfile';
import { ItineraryList } from './ItineraryList';
import { ItineraryDetailModal } from './ItineraryDetailModal';
import type { Itinerary } from '../model/types';

export const MyPage = () => {
  const { data, isLoading, isError } = useMyPageData();
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItineraryClick = (itinerary: Itinerary) => {
    setSelectedItinerary(itinerary);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItinerary(null), 300);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-primary/30 border-t-brand-secondary rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-gray-600 text-lg font-light">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-red-500 text-lg font-light">데이터를 불러오는데 실패했습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-primary/5">
      <UserProfile email={data.email} nickname={data.nickname} />

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">나의 동선</h2>
          <p className="text-gray-600">저장한 여행 동선을 확인하고 관리하세요</p>
        </div>

        <ItineraryList itineraries={data.list} onItineraryClick={handleItineraryClick} />
      </main>

      <ItineraryDetailModal
        itinerary={selectedItinerary}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};
