'use client';

import { useState } from 'react';
import { ItineraryRequest } from '@/entities/ai-itinerary';
import { TRANSPORT_HUBS, DURATION_OPTIONS, THEME_OPTIONS } from '@/entities/ai-itinerary';

interface ItineraryFormProps {
  onSubmit: (request: ItineraryRequest) => void;
  isLoading: boolean;
}

export function ItineraryForm({ onSubmit, isLoading }: ItineraryFormProps) {
  const [formData, setFormData] = useState<ItineraryRequest>({
    departure_hub: '',
    arrival_hub: '',
    duration: '1박2일',
    theme: 'all',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.departure_hub && formData.arrival_hub) {
      onSubmit(formData);
    }
  };

  const allHubs = [...TRANSPORT_HUBS.airports, ...TRANSPORT_HUBS.stations];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🎬 AI 여행 일정 생성기
        </h1>
        <p className="text-gray-600">
          K-콘텐츠 촬영지를 중심으로 한 맞춤형 여행 일정을 생성해드립니다
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            출발지
          </label>
          <select
            value={formData.departure_hub}
            onChange={(e) => setFormData({ ...formData, departure_hub: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isLoading}
          >
            <option value="">출발지를 선택하세요</option>
            <optgroup label="공항">
              {TRANSPORT_HUBS.airports.map((hub) => (
                <option key={hub.id} value={hub.id}>
                  {hub.name} ({hub.region})
                </option>
              ))}
            </optgroup>
            <optgroup label="기차역">
              {TRANSPORT_HUBS.stations.map((hub) => (
                <option key={hub.id} value={hub.id}>
                  {hub.name} ({hub.region})
                </option>
              ))}
            </optgroup>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            도착지
          </label>
          <select
            value={formData.arrival_hub}
            onChange={(e) => setFormData({ ...formData, arrival_hub: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isLoading}
          >
            <option value="">도착지를 선택하세요</option>
            <optgroup label="공항">
              {TRANSPORT_HUBS.airports.map((hub) => (
                <option key={hub.id} value={hub.id}>
                  {hub.name} ({hub.region})
                </option>
              ))}
            </optgroup>
            <optgroup label="기차역">
              {TRANSPORT_HUBS.stations.map((hub) => (
                <option key={hub.id} value={hub.id}>
                  {hub.name} ({hub.region})
                </option>
              ))}
            </optgroup>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            여행 기간
          </label>
          <div className="grid grid-cols-3 gap-3">
            {DURATION_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, duration: option.value })}
                disabled={isLoading}
                className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                  formData.duration === option.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            콘텐츠 테마
          </label>
          <div className="grid grid-cols-2 gap-3">
            {THEME_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, theme: option.value })}
                disabled={isLoading}
                className={`p-4 rounded-lg border-2 transition-colors text-left ${
                  formData.theme === option.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-500">{option.description}</div>
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading || !formData.departure_hub || !formData.arrival_hub}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? '일정 생성 중...' : '🚀 여행 일정 생성하기'}
        </button>
      </form>
    </div>
  );
}