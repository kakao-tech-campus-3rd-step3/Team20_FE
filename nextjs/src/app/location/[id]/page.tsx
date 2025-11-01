'use client';

import React from 'react';
import { useLocationDetail } from '@/entities/location/api/queryfn';
import { useLocationReviews } from '@/entities/location-review';
import {
  LocationHero,
  LocationDescription,
  LocationRelatedContents,
  LocationReviews,
} from '@/features/LocationDetail';
import { quickFacts } from '@/features/LocationDetail/model/constants';

interface LocationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function LocationDetailPage({ params }: LocationDetailPageProps) {
  const unwrappedParams = React.use(params);
  const { id } = unwrappedParams;
  
  const { data, isLoading } = useLocationDetail(id);
  const { data: reviewsData, isLoading: reviewsLoading } = useLocationReviews(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="animate-pulse">
            <div className="h-48 sm:h-64 md:h-80 lg:h-[28rem] bg-gray-200 rounded-2xl mb-6 sm:mb-8"></div>
            <div className="space-y-3 sm:space-y-4">
              <div className="h-4 bg-gray-200 rounded w-5/6 sm:w-3/4 lg:w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/5 sm:w-1/2 lg:w-2/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6">
        <div className="text-center max-w-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2 sm:mb-3">
            위치 정보를 찾을 수 없습니다
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">다시 시도해 주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="relative">
        <div className="mx-auto w-full max-w-7xl px-0 sm:px-0">
          <LocationHero location={data} />
        </div>
      </div>
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 space-y-8 sm:space-y-10 lg:space-y-12">
        <section className="transform -mt-6 sm:-mt-10 lg:-mt-12 relative z-10">
          <LocationDescription description={data.description ?? ''} quickFacts={quickFacts} />
        </section>
        <section className="relative z-10">
          <LocationRelatedContents relatedContents={data.relatedContents ?? []} />
        </section>
        <section className="relative z-10">
          <LocationReviews
            reviews={reviewsData?.locationReviews ?? []}
            isLoading={reviewsLoading}
            locationId={id}
          />
        </section>
      </main>
      <div className="h-10 sm:h-12 lg:h-16" />
    </div>
  );
}
