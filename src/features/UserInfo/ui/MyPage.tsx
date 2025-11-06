import { useState } from 'react';
import { useMyPageData } from '../hooks/useMyPageData';
import { UserProfile } from './UserProfile';
import { ItineraryList } from './ItineraryList';
import { ItineraryDetailModal } from './ItineraryDetailModal';
import { messages } from '../model/messages';
import { useDeleteItinerary } from '@/entities/itinerary/api/queryfn';
import type { Itinerary } from '../model/types';

export const MyPage = () => {
  const { data, refetch } = useMyPageData();
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteItineraryMutation = useDeleteItinerary();

  const handleItineraryClick = (itinerary: Itinerary) => {
    setSelectedItinerary(itinerary);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItinerary(null), 300);
  };

  const handleDeleteItinerary = (itineraryId: number) => {
    deleteItineraryMutation.mutate(itineraryId.toString(), {
      onSuccess: () => {
        refetch();
      },
    });
  };

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
