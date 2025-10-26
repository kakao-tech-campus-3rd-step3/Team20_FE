'use client';

import { useEffect } from 'react';

export function KakaoScript() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;
    
    script.onload = () => {
      if (window.kakao?.maps) {
        window.kakao.maps.load(() => {
          console.log('Kakao Maps SDK loaded successfully');
        });
      }
    };
    
    script.onerror = () => {
      console.error('Failed to load Kakao Maps SDK');
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Cleanup script when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null;
}
