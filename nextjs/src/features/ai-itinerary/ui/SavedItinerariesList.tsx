'use client';

import { useUserAiItineraries, useDeleteAiItinerary } from '@/entities/ai-itinerary/api/backend-queryfn';
import { AiItinerarySummary } from '@/entities/ai-itinerary/model/backend-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { DeleteConfirmModal } from './DeleteConfirmModal';

export function SavedItinerariesList() {
  const { data: itinerariesResponse, isLoading, error } = useUserAiItineraries();
  const deleteItineraryMutation = useDeleteAiItinerary();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItineraryId, setSelectedItineraryId] = useState<number | null>(null);

  const handleDeleteClick = (itineraryId: number) => {
    setSelectedItineraryId(itineraryId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedItineraryId) return;
    
    setDeletingId(selectedItineraryId);
    setShowDeleteModal(false);
    
    try {
      await deleteItineraryMutation.mutateAsync(selectedItineraryId);
      toast.success('여행 일정이 삭제되었습니다.');
    } catch (error) {
      console.error('삭제 실패:', error);
      toast.error('삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setDeletingId(null);
      setSelectedItineraryId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedItineraryId(null);
  };

  const getThemeLabel = (theme: string) => {
    switch (theme) {
      case 'drama': return '드라마';
      case 'movie': return '영화';
      case 'pop': return 'K-POP';
      default: return '전체';
    }
  };

  const getThemeEmoji = (theme: string) => {
    switch (theme) {
      case 'drama': return '📺';
      case 'movie': return '🎬';
      case 'pop': return '🎵';
      default: return '🎭';
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-100 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            저장된 일정을 불러올 수 없어요
          </h2>
          <p className="text-gray-600">
            네트워크 연결을 확인하고 다시 시도해주세요.
          </p>
        </div>
      </div>
    );
  }

  const itineraries = itinerariesResponse || [];

  if (itineraries.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            저장된 여행 일정이 없어요
          </h2>
          <p className="text-gray-600 mb-6">
            AI로 새로운 여행 일정을 만들어보세요!
          </p>
          <a
            href="/itinerary"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            🚀 새 일정 만들기
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            💾 저장된 여행 일정
          </h1>
          <a
            href="/itinerary"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            새 일정 만들기
          </a>
        </div>

        <div className="space-y-4">
          {itineraries.map((itinerary: AiItinerarySummary) => (
            <div
              key={itinerary.itineraryId}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getThemeEmoji(itinerary.theme)}</span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {itinerary.startPoint} → {itinerary.endPoint}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {getThemeLabel(itinerary.theme)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>📅 {itinerary.duration}</span>
                    <span>🕒 {new Date(itinerary.createdAt).toLocaleDateString('ko-KR')}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`/ai-itinerary/${itinerary.itineraryId}`}
                    className="bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 transition-colors text-sm"
                  >
                    상세보기
                  </a>
                  <button
                    onClick={() => handleDeleteClick(itinerary.itineraryId)}
                    disabled={deletingId === itinerary.itineraryId}
                    className="bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-200 transition-colors text-sm disabled:opacity-50"
                  >
                    {deletingId === itinerary.itineraryId ? '삭제 중...' : '삭제'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 삭제 확인 모달 */}
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      </div>
    </div>
  );
}