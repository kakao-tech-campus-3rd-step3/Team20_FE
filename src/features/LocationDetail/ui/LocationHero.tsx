import { MapPin, Share2, Copy, Navigation, Heart } from 'lucide-react';
import { Button, IconButton } from '@/shared/ui';
import type { LocationHeroProps } from '../model/types';

export function LocationHero({ location }: LocationHeroProps) {
  const kakaoToLink = `https://map.kakao.com/link/to/${encodeURIComponent(
    location.name,
  )},${location.latitude},${location.longitude}`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(location.address);
    } catch (error) {
      console.error('[LocationHero] 주소 복사 실패', error);
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
    <header className="relative rounded-16 overflow-hidden shadow-custom-heavy ">
      <img src={location.locationImage} alt={location.name} className="w-full h-200 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-16 left-16 right-16 text-white p-16 rounded-16">
        <h1 className="text-32 leading-40 font-semibold">{location.name}</h1>
        <p className="mt-8 text-16 opacity-90 inline-flex items-center">
          <MapPin className="mr-8" size={18} />
          {location.address}
        </p>
        <div className="mt-12 flex items-center gap-12">
          <Button size="lg" className="rounded-16" onClick={handleOpenKakaoMap}>
            <Navigation size={16} />
            길찾기
          </Button>
          <Button size="lg" className="rounded-16" onClick={handleCopyAddress}>
            <Copy size={16} />
            주소 복사
          </Button>
          <IconButton
            Icon={Heart}
            aria-label="좋아요"
            className="bg-white/20 hover:bg-white/30 text-white"
            onClick={handleLike}
          />
          <IconButton
            Icon={Share2}
            aria-label="공유"
            className="bg-white/20 hover:bg-white/30 text-white"
            onClick={handleShare}
          />
        </div>
      </div>
    </header>
  );
}
