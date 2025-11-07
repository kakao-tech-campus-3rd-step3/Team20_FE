'use client';

import { useEffect, useState } from 'react';

let kakaoScriptLoaded = false;
let kakaoScriptPromise: Promise<void> | null = null;

export function KakaoScript() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // 사용자가 페이지와 상호작용하거나 스크롤할 때 로드
    const handleUserInteraction = () => {
      setShouldLoad(true);
    };

    const handleScroll = () => {
      // 페이지 하단 50%에 도달하면 로드
      if (window.scrollY > document.documentElement.scrollHeight * 0.5) {
        setShouldLoad(true);
      }
    };

    // 3초 후 자동 로드 (fallback)
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 3000);

    // 이벤트 리스너 등록
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!shouldLoad || kakaoScriptLoaded) return;

    if (!kakaoScriptPromise) {
      kakaoScriptPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
        script.async = true;

        script.onload = () => {
          kakaoScriptLoaded = true;
          if (window.kakao?.maps) {
            window.kakao.maps.load(() => {
              console.log('Kakao Maps SDK loaded successfully');
              resolve();
            });
          } else {
            resolve();
          }
        };

        script.onerror = () => {
          console.error('Failed to load Kakao Maps SDK');
          reject(new Error('Failed to load Kakao Maps SDK'));
        };

        document.head.appendChild(script);
      });
    }

    kakaoScriptPromise.catch(() => {
      // 에러 처리는 이미 위에서 했으므로 여기서는 무시
    });
  }, [shouldLoad]);

  return null;
}

// 카카오맵이 필요한 컴포넌트에서 사용할 훅
export function useKakaoMapsLoader() {
  const [isLoaded, setIsLoaded] = useState(kakaoScriptLoaded);

  useEffect(() => {
    if (kakaoScriptLoaded) {
      setIsLoaded(true);
      return;
    }

    if (kakaoScriptPromise) {
      kakaoScriptPromise.then(() => setIsLoaded(true));
    }
  }, []);

  return isLoaded;
}
