import { useState } from 'react';
import { useMyPageData } from '../hooks/useMyPageData';
import { UserProfile } from './UserProfile';
import { ItineraryList } from './ItineraryList';
import { ItineraryDetailModal } from './ItineraryDetailModal';
import { messages } from '../model/messages';
import { deleteItinerary } from '@/entities/itinerary/api/itineraryApi';
import type { Itinerary } from '../model/types';

export const MyPage = () => {
  const { data, isLoading, isError, refetch } = useMyPageData();
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

  const handleDeleteItinerary = async (itineraryId: number) => {
    try {
      await deleteItinerary(itineraryId.toString());
      refetch(); // 데이터 새로고침
    } catch (error) {
      console.error('동선 삭제 실패:', error);
      alert('동선 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-primary/30 border-t-brand-secondary rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-gray-600 text-lg font-light">{messages.loading}</div>
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
          <div className="text-red-500 text-lg font-light">{messages.errorTitle}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-primary/5">
      <UserProfile email={data.email} nickname={data.nickname} />

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{messages.myItineraries}</h2>
        </div>

        <ItineraryList itineraries={data.list} onItineraryClick={handleItineraryClick} />
      </main>

      <ItineraryDetailModal
        itinerary={selectedItinerary}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDeleteItinerary}
      />
    </div>
  );
};
