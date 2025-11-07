'use client';

import { SavedItinerariesList } from '@/features/ai-itinerary/ui/SavedItinerariesList';

export default function SavedItinerariesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SavedItinerariesList />
    </div>
  );
}