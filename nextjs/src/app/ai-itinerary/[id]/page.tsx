'use client';

import { SavedItineraryDetail } from '@/features/ai-itinerary/ui/SavedItineraryDetail';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function SavedItineraryDetailPage() {
  const params = useParams();
  const itineraryId = parseInt(params.id as string);

  if (isNaN(itineraryId)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              잘못된 접근입니다
            </h2>
            <p className="text-gray-600 mb-6">
              올바른 여행 일정 ID가 아닙니다.
            </p>
            <Link
              href="/ai-itinerary"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <SavedItineraryDetail itineraryId={itineraryId} />;
}