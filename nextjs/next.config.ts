import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Docker 배포를 위한 standalone 출력
  turbopack: {
    root: __dirname,
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    remotePatterns: [
      // 1. [신규] TMDB 이미지 서버
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**', // '/t/p/'로 시작하는 모든 경로 허용
      },
      // 2. [기존] localhost (개발 서버용)
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      // 3. [기존] github.com
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      // 4. CloudFront CDN
      {
        protocol: 'https',
        hostname: 'd2d0fud3w2c5j6.cloudfront.net',
      },
      // 참고: 깃헙 아바타는 'avatars.githubusercontent.com'
      // 참고: 깃헙 raw 파일은 'raw.githubusercontent.com'
      // 필요에 따라 위 2개도 추가해 주세요.
    ],
  },

};

export default nextConfig;
