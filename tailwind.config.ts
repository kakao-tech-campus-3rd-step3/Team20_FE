import type { Config } from 'tailwindcss';

const px = (length: number) => Object.fromEntries(Array.from({ length }, (_, i) => [i, `${i}px`]));

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '390px',
      md: '768px',
      lg: '1080px',
      xl: '1320px',
    },
    extend: {
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
