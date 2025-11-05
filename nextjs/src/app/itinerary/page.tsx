'use client';

import { useState } from 'react';
import { ItineraryForm } from '@/features/itinerary/components/ItineraryForm';
import { LoadingProgress } from '@/features/itinerary/components/LoadingProgress';
import { ItineraryResult } from '@/features/itinerary/components/ItineraryResult';
import { ItineraryAPI } from '@/entities/ai-itinerary/api/api';
import { ItineraryRequest, ItineraryResponse } from '@/entities/ai-itinerary/model/types';

export default function ItineraryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ItineraryResponse | null>(null);

  const handleSubmit = async (request: ItineraryRequest) => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await ItineraryAPI.generateItinerary(request);
      setResult(response);
    } catch (error) {
      setResult({
        success: false,
        error: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {!result ? (
          <ItineraryForm onSubmit={handleSubmit} isLoading={isLoading} />
        ) : (
          <ItineraryResult result={result} onReset={handleReset} />
        )}
      </div>

      <LoadingProgress isVisible={isLoading} />
    </div>
  );
}