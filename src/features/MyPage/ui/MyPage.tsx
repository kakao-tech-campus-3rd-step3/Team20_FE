import { useState } from 'react';
import { useMyPage } from '../hooks/useMyPage';

interface SavedLocation {
  locationId: number;
  name: string;
  image: string;
  address: string;
  description: string;
}

interface SavedRoute {
  routeId: number;
  name: string;
  locations: string[];
  createdAt: string;
  description: string;
}

interface LocationCardProps {
  location: SavedLocation;
  onDelete: (locationId: number) => void;
}

interface RouteCardProps {
  route: SavedRoute;
  onDelete: (routeId: number) => void;
}

const LocationCard = ({ location, onDelete }: LocationCardProps) => {
  return (
    <div className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative aspect-video overflow-hidden">
        <img src={location.image} alt={location.name} className="w-full h-full object-cover" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-900/20 hover:bg-gray-900/40 transition-colors" />

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(location.locationId);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/95 backdrop-blur-sm hover:bg-red-50 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
        >
          <svg
            className="w-4 h-4 text-gray-700 hover:text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Badge */}
        <div className="absolute top-3 left-3 bg-brand-secondary/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
          📍 저장됨
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900/80 to-transparent">
          <h4 className="text-white text-lg font-semibold mb-1 truncate">{location.name}</h4>
          <p className="text-white/80 text-sm truncate flex items-center">
            <svg
              className="w-3.5 h-3.5 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {location.address}
          </p>
        </div>
      </div>
    </div>
  );
};

const RouteCard = ({ route, onDelete }: RouteCardProps) => {
  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50">
      {/* Header Section with Gradient Background */}
      <div className="relative bg-gradient-to-r from-violet-500 via-brand-secondary to-cyan-500 p-6 pb-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 blur-2xl"></div>

        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-3">
              <svg
                className="w-4 h-4 text-white mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-white text-xs font-medium">{route.createdAt}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-sm">{route.name}</h3>
            <div className="flex items-center text-white/90 text-sm">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="font-semibold">{route.locations.length}개 장소</span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(route.routeId);
            }}
            className="w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <svg
              className="w-4 h-4 text-gray-700 hover:text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Body Section */}
      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-6">{route.description}</p>

        {/* Route Timeline */}
        <div className="space-y-3 mb-6">
          {route.locations.map((location, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center mr-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md ${
                    index === 0
                      ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white'
                      : index === route.locations.length - 1
                        ? 'bg-gradient-to-br from-rose-400 to-pink-500 text-white'
                        : 'bg-gradient-to-br from-violet-400 to-purple-500 text-white'
                  }`}
                >
                  {index + 1}
                </div>
                {index < route.locations.length - 1 && (
                  <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-200 my-1"></div>
                )}
              </div>
              <div className="flex-1 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 hover:border-brand-secondary/30 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{location}</span>
                  {index === 0 && (
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      출발
                    </span>
                  )}
                  {index === route.locations.length - 1 && (
                    <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">
                      도착
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button className="group/btn flex items-center text-brand-secondary hover:text-brand-secondary/80 font-semibold text-sm transition-all duration-200">
            <span>동선 보기</span>
            <svg
              className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-brand-secondary text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
            지도에서 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export const MyPage = () => {
  const [activeTab, setActiveTab] = useState<'locations' | 'routes'>('locations');
  const { savedLocations, savedRoutes, isLoading, isError, deleteLocation, deleteRoute } =
    useMyPage();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-primary/30 border-t-brand-secondary rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-gray-600 text-lg font-light">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (isError) {
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
          <div className="text-red-500 text-lg font-light">데이터를 불러오는데 실패했습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-primary/5">
      {/* Modern Header */}
      <header className="relative bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-brand-tertiary/5"></div>
        <div className="relative max-w-7xl mx-auto px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-brand-secondary bg-clip-text text-transparent mb-4">
              마이페이지
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              저장한 장소와 동선을 한눈에 관리하고, 새로운 여행을 계획해보세요
            </p>
          </div>
        </div>
      </header>

      {/* Modern Tab Navigation - 2분할 */}
      <div className="bg-white/60 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="bg-gray-100/80 backdrop-blur-sm rounded-2xl p-2 grid grid-cols-2 gap-2 max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('locations')}
              className={`relative py-4 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === 'locations'
                  ? 'bg-white text-brand-secondary shadow-lg shadow-brand-primary/20 transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>저장한 장소</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === 'locations'
                      ? 'bg-brand-primary/20 text-brand-secondary'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {savedLocations.length}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`relative py-4 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === 'routes'
                  ? 'bg-white text-brand-secondary shadow-lg shadow-brand-primary/20 transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                <span>저장한 동선</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === 'routes'
                      ? 'bg-brand-primary/20 text-brand-secondary'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {savedRoutes.length}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {activeTab === 'locations' ? (
          <div>
            {savedLocations.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-primary/20 to-brand-tertiary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-brand-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  아직 저장한 장소가 없어요
                </h3>
                <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                  마음에 드는 장소를 발견하면 저장해보세요. 언제든 다시 찾아볼 수 있어요.
                </p>
                <button className="bg-gradient-to-r from-brand-primary to-brand-tertiary text-brand-secondary px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-brand-primary/25 transition-all duration-300 transform hover:scale-105">
                  장소 둘러보기
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {savedLocations.map((location) => (
                  <LocationCard
                    key={location.locationId}
                    location={location}
                    onDelete={deleteLocation}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {savedRoutes.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-primary/20 to-brand-tertiary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-brand-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  아직 저장한 동선이 없어요
                </h3>
                <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                  여행 계획을 세우고 나만의 동선을 만들어보세요. 완벽한 여행이 시작됩니다.
                </p>
                <button className="bg-gradient-to-r from-brand-primary to-brand-tertiary text-brand-secondary px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-brand-primary/25 transition-all duration-300 transform hover:scale-105">
                  동선 만들기
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {savedRoutes.map((route) => (
                  <RouteCard key={route.routeId} route={route} onDelete={deleteRoute} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
