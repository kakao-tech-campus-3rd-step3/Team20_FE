'use client';

import { ItineraryResponse } from '@/entities/ai-itinerary';

interface ItineraryResultProps {
  result: ItineraryResponse;
  onReset: () => void;
}

export function ItineraryResult({ result, onReset }: ItineraryResultProps) {
  if (!result.success || !result.data) {
    const getErrorDisplay = (errorMessage: string) => {
      if (errorMessage.includes('연관된 장소를 찾을 수 없어요')) {
        return {
          emoji: '🔍',
          title: '촬영지를 찾을 수 없어요',
          suggestions: [
            '다른 도착지를 선택해보세요',
            '다른 콘텐츠 테마를 시도해보세요',
            '여행 기간을 조정해보세요'
          ]
        };
      } else if (errorMessage.includes('서버에 일시적인 문제')) {
        return {
          emoji: '⚠️',
          title: '서버 문제가 발생했어요',
          suggestions: [
            '잠시 후 다시 시도해주세요',
            '문제가 지속되면 새로고침해보세요'
          ]
        };
      } else if (errorMessage.includes('네트워크') || errorMessage.includes('인터넷')) {
        return {
          emoji: '📶',
          title: '네트워크 연결 문제',
          suggestions: [
            '인터넷 연결을 확인해주세요',
            'Wi-Fi 또는 데이터 연결을 다시 시도해보세요'
          ]
        };
      } else {
        return {
          emoji: '😞',
          title: '일정 생성에 실패했어요',
          suggestions: [
            '다시 시도해보세요',
            '문제가 계속되면 새로고침해주세요'
          ]
        };
      }
    };

    const errorDisplay = getErrorDisplay(result.error || '');

    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">{errorDisplay.emoji}</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {errorDisplay.title}
          </h2>
          <p className="text-gray-600 mb-6">
            {result.error || '알 수 없는 오류가 발생했습니다.'}
          </p>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 해결 방법</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              {errorDisplay.suggestions.map((suggestion, index) => (
                <li key={index}>• {suggestion}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onReset}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔄 다시 시도하기
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              🔄 새로고침
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { selected_contents, itinerary, summary, metadata } = result.data;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🎬 {metadata.arrival.region} {metadata.theme === 'drama' ? '드라마' : metadata.theme === 'movie' ? '영화' : metadata.theme === 'pop' ? 'K-POP' : '콘텐츠'} 촬영지 여행
            </h1>
            <p className="text-gray-600">
              {metadata.departure.name} → {metadata.arrival.name} | {metadata.duration}
            </p>
          </div>
          <button
            onClick={onReset}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            새로 만들기
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{summary.total_locations}</div>
            <div className="text-sm text-gray-600">촬영지</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{summary.total_distance_km}km</div>
            <div className="text-sm text-gray-600">총 이동거리</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-600">{summary.estimated_cost_per_person}</div>
            <div className="text-sm text-gray-600">예상 비용</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-lg font-bold text-orange-600">{summary.best_season}</div>
            <div className="text-sm text-gray-600">추천 시기</div>
          </div>
        </div>
      </div>

      {/* 선택된 콘텐츠 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📺 선택된 콘텐츠</h2>
        <div className="grid gap-4">
          {selected_contents.map((content) => (
            <div key={content.content_id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{content.title}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {content.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{content.reason}</p>
              <div className="text-xs text-gray-500">
                촬영지 {content.locations_count}곳 포함
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 일정표 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🗓️ 상세 일정</h2>
        <div className="space-y-8">
          {Object.entries(itinerary).map(([day, locations]) => (
            <div key={day} className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 capitalize">
                {day.replace('_', ' ')}
              </h3>
              <div className="space-y-4">
                {locations.map((location, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-600 text-white text-sm px-2 py-1 rounded">
                          {location.time}
                        </div>
                        <h4 className="font-semibold text-gray-900">
                          {location.location_name || location.restaurant || location.description}
                        </h4>
                      </div>
                      {location.duration && (
                        <span className="text-sm text-gray-500">{location.duration}</span>
                      )}
                    </div>

                    {location.address && (
                      <p className="text-sm text-gray-600 mb-2">📍 {location.address}</p>
                    )}

                    {location.content_title && (
                      <div className="mb-2">
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mr-2">
                          {location.content_title}
                        </span>
                        {location.scene && (
                          <span className="text-sm text-gray-600">{location.scene}</span>
                        )}
                      </div>
                    )}

                    {location.menu && location.estimated_cost && (
                      <div className="mb-2">
                        <span className="text-sm text-gray-600">
                          🍽️ {location.menu} - {location.estimated_cost}
                        </span>
                      </div>
                    )}

                    {location.activities && location.activities.length > 0 && (
                      <div className="mb-2">
                        <div className="flex flex-wrap gap-1">
                          {location.activities.map((activity, i) => (
                            <span key={i} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {location.tips && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mt-2">
                        <p className="text-sm text-yellow-800">💡 {location.tips}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 추가 정보 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">ℹ️ 여행 정보</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">교통수단</h3>
            <p className="text-gray-600">{summary.transportation}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">추천 시기</h3>
            <p className="text-gray-600">{summary.best_season}</p>
          </div>
        </div>
      </div>
    </div>
  );
}