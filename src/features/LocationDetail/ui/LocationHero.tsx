import { MapPin, Copy, Navigation, Camera } from 'lucide-react';
import { toast } from 'react-toastify';
import { Button } from '@/shared/ui';
import { useImageError } from '@/shared/hooks/useImageError';
import type { LocationHeroProps } from '../model/types';

export function LocationHero({ location }: LocationHeroProps) {
  const [imageError, handleImageError, imageUrl] = useImageError(location.imageUrl);
  const showFallback = !imageUrl || imageError;

  const kakaoToLink = `https://map.kakao.com/link/to/${encodeURIComponent(
    location.name,
  )},${location.latitude},${location.longitude}`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(location.address);
      toast.success('주소를 복사했어요.');
    } catch {
      toast.error('주소 복사에 실패했어요. 다시 시도해 주세요.');
    }
  };

  const handleOpenKakaoMap = () => {
    window.open(kakaoToLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="relative mx-auto max-w-6xl px-4">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
        <div className="aspect-[16/9] relative overflow-hidden bg-gray-800">
          {showFallback ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-white">
              <Camera size={48} className="opacity-50 mb-4" />
              <span className="text-lg font-medium opacity-75">{location.name}</span>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt={location.name}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              onError={handleImageError}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
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
