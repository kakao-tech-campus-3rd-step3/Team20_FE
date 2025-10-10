import { MapPin, Share2, Copy, Navigation, Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import { Button, IconButton } from '@/shared/ui';
import type { LocationHeroProps } from '../model/types';

export function LocationHero({ location }: LocationHeroProps) {
  const kakaoToLink = `https://map.kakao.com/link/to/${encodeURIComponent(
    location.name,
  )},${location.latitude},${location.longitude}`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(location.address);
      toast.success('주소를 복사했어요.');
    } catch (error) {
      console.error('[LocationHero] 주소 복사 실패', error);
      toast.error('주소 복사에 실패했어요. 다시 시도해 주세요.');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: location.name,
      text: `${location.name} - ${location.address}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
      }
    } catch (error) {
      console.error('[LocationHero] 공유 실패', error);
    }
  };

  const handleOpenKakaoMap = () => {
    window.open(kakaoToLink, '_blank', 'noopener,noreferrer');
  };

  const handleLike = () => {
    console.log('좋아요');
  };

  return (
    <header className="relative mx-auto max-w-6xl px-4">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
        <div className="aspect-[16/9] relative overflow-hidden">
          <img
            src={location.locationImage}
            alt={location.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Floating Action Buttons */}
          <div className="absolute top-6 right-6 flex gap-3">
            <IconButton
              Icon={Heart}
              aria-label="좋아요"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/20 transition-all duration-200"
              onClick={handleLike}
            />
            <IconButton
              Icon={Share2}
              aria-label="공유"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/20 transition-all duration-200"
              onClick={handleShare}
            />
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
              {location.name}
            </h1>
            <div className="flex items-center mb-6 text-lg opacity-95">
              <MapPin className="mr-3 flex-shrink-0" size={20} />
              <span className="drop-shadow-md">{location.address}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="rounded-2xl bg-white/90 text-gray-900 hover:bg-white hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
                onClick={handleOpenKakaoMap}
              >
                <Navigation size={18} className="mr-2" />
                길찾기
              </Button>
              <Button
                size="lg"
                className="rounded-2xl bg-transparent border-2 border-white/50 text-white hover:bg-white/10 hover:border-white transition-all duration-200 font-semibold backdrop-blur-sm"
                onClick={handleCopyAddress}
              >
                <Copy size={18} className="mr-2" />
                주소 복사
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
