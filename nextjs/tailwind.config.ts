import type { Config } from 'tailwindcss';

const px = (length: number) => Object.fromEntries(Array.from({ length }, (_, i) => [i, `${i}px`]));

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/entities/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '390px',
      md: '768px',
      lg: '1080px',
      xl: '1320px',
    },
    extend: {
      // 색상, 폰트, 애니메이션은 app/_styles에서 CSS 변수로 정의
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cal-sans)', 'system-ui', 'sans-serif'],
      },
      spacing: px(500),
      borderWidth: px(50),
      borderRadius: px(50),
      leading: px(50),
      fontSize: px(50),
      boxShadow: {
        'custom-light': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'custom-medium': '0 4px 8px rgba(0, 0, 0, 0.15)',
        'custom-heavy': '0 8px 16px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
