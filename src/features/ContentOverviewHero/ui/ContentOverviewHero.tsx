import { MapPin, Map } from 'lucide-react';
import squidGameImage from '../../../__mocks__/k-drama-squidgame-horizontal.jpg';
import { ContentOverviewIconGroup } from './ContentOverviewIconGroup';

interface ContentOverviewHeroProps {
  title?: string;
  category?: string;
  isLiked?: boolean;
}

export function ContentOverviewHero({
  title = '오징어 게임',
  category = 'K-DRAMA',
}: ContentOverviewHeroProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <img src={squidGameImage} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      </div>

      {/* 상단 네비게이션 */}
      <ContentOverviewIconGroup />

      {/* 콘텐츠 정보 */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 pb-8">
        {/* 카테고리 태그 */}
        <div className="mb-4">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-600 to-red-600 text-white text-sm font-semibold rounded-full">
            {category}
          </span>
        </div>

        {/* 제목 */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">{title}</h1>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-md">
          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            <MapPin className="w-5 h-5" />
            촬영지 보기
          </button>

          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/30 hover:bg-white/30 transition-colors">
            <Map className="w-5 h-5" />
            지도 보기
          </button>
        </div>
      </div>
    </div>
  );
}
