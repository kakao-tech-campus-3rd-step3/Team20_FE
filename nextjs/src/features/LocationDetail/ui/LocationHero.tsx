'use client';

import Image from 'next/image';
import { MapPin, Share2, Copy, Navigation, Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import { Button, IconButton } from '@/shared/ui';
import { useLocationDetail } from '@/entities/location/api/queryfn';

interface LocationHeroProps {
  locationId: string;
}

export function LocationHero({ locationId }: LocationHeroProps) {
  const { data: location, isLoading, isError } = useLocationDetail(locationId);

  if (isLoading) {
    return (
      <div className="h-96 bg-gradient-to-b from-[var(--color-gray-100)] to-[var(--color-gray-200)] flex items-center justify-center">
        <div className="text-[var(--color-text-secondary)]">로딩 중...</div>
      </div>
    );
  }

  if (isError || !location) {
    return (
      <div className="h-96 bg-gradient-to-b from-[var(--color-gray-100)] to-[var(--color-gray-200)] flex items-center justify-center">
        <div className="text-[var(--color-text-secondary)]">위치 정보를 불러올 수 없습니다.</div>
      </div>
    );
  }
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
    <header className="relative mx-auto max-w-[800px] rounded-16 overflow-hidden shadow-custom-heavy">
      <div className="relative w-full h-200">
        <Image
          src={location.locationImage || '/placeholder-image.jpg'}
          alt={location.name}
          fill
          className="object-cover object-center rounded-2xl"
          sizes="(max-width: 800px) 100vw, 800px"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-2xl" />
      <div className="absolute bottom-16 left-16 right-16 text-white p-16 rounded-2xl">
        <h1 className="text-32 leading-40 font-semibold">{location.name}</h1>
        <p className="mt-8 text-16 opacity-90 inline-flex items-center">
          <MapPin className="mr-8" size={18} />
          {location.address}
        </p>
        <div className="mt-12 flex items-center gap-12">
          <Button className="rounded-16 px-4 py-2" onClick={handleOpenKakaoMap}>
            <Navigation size={16} />
            길찾기
          </Button>
          <Button className="rounded-16 px-4 py-2" onClick={handleCopyAddress}>
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
