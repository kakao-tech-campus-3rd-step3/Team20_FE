'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAiItinerary, useDeleteAiItinerary } from '@/entities/ai-itinerary/api/backend-queryfn';
import { ItineraryResult } from '@/features/itinerary/ui/ItineraryResult';
import { toast } from 'react-toastify';
import { DeleteConfirmModal } from './DeleteConfirmModal';

interface SavedItineraryDetailProps {
  itineraryId: number;
}

export function SavedItineraryDetail({ itineraryId }: SavedItineraryDetailProps) {
  const { data: response, isLoading, error } = useAiItinerary(itineraryId);
  const deleteItineraryMutation = useDeleteAiItinerary();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-gray-100 rounded"></div>
              ))}
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-100 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !response) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            여행 일정을 불러올 수 없어요
          </h2>
          <p className="text-gray-600 mb-6">
            일정이 삭제되었거나 접근 권한이 없을 수 있습니다.
          </p>
          <Link
            href="/ai-itinerary"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const itinerary = response;
  
  // 저장된 데이터를 ItineraryResponse 형태로 변환
  const itineraryResponse = {
    success: true,
    data: itinerary.data,
  };

  // formData 재구성
  const formData = {
    departure_hub: itinerary.startPoint,
    arrival_hub: itinerary.endPoint,
    duration: itinerary.duration,
    theme: itinerary.theme,
  };

  const handleReset = () => {
    router.push('/ai-itinerary');
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setShowDeleteModal(false);
    setIsDeleting(true);
    
    try {
      await deleteItineraryMutation.mutateAsync(itineraryId);
      toast.success('여행 일정이 삭제되었습니다.');
      router.push('/ai-itinerary');
    } catch (error) {
      console.error('삭제 실패:', error);
      toast.error('삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => router.push('/ai-itinerary')}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            ← 저장된 일정 목록으로
          </button>
          
          <button
            onClick={handleDeleteClick}
            disabled={isDeleting}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-400"
          >
            {isDeleting ? '삭제 중...' : '🗑️ 일정 삭제'}
          </button>
        </div>
        
        <ItineraryResult 
          result={itineraryResponse} 
          onReset={handleReset}
          formData={formData}
          showSaveButton={false}
        />

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