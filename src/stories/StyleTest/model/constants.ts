import type { ColorInfo, TypographyInfo, SafeAreaInfo, ZIndexInfo } from './types';

/**
 * 색상 테스트 데이터
 */
export const COLORS: Record<string, ColorInfo[]> = {
  brand: [
    {
      name: 'Primary',
      value: '#eccbee',
      cssVar: '--color-brand-primary',
      tailwindClass: 'bg-brand-primary',
    },
    {
      name: 'Secondary',
      value: '#a864a2',
      cssVar: '--color-brand-secondary',
      tailwindClass: 'bg-brand-secondary',
    },
    {
      name: 'Tertiary',
      value: '#c480d4',
      cssVar: '--color-brand-tertiary',
      tailwindClass: 'bg-brand-tertiary',
    },
  ],
  semantic: [
    {
      name: 'Success',
      value: '#10b981',
      cssVar: '--color-semantic-success',
      tailwindClass: 'bg-semantic-success',
    },
    {
      name: 'Warning',
      value: '#f59e0b',
      cssVar: '--color-semantic-warning',
      tailwindClass: 'bg-semantic-warning',
    },
    {
      name: 'Error',
      value: '#ef4444',
      cssVar: '--color-semantic-error',
      tailwindClass: 'bg-semantic-error',
    },
    {
      name: 'Info',
      value: '#3b82f6',
      cssVar: '--color-semantic-info',
      tailwindClass: 'bg-semantic-info',
    },
  ],
  gray: [
    { name: 'Gray 50', value: '#f9fafb', cssVar: '--color-gray-50', tailwindClass: 'bg-gray-50' },
    {
      name: 'Gray 100',
      value: '#f3f4f6',
      cssVar: '--color-gray-100',
      tailwindClass: 'bg-gray-100',
    },
    {
      name: 'Gray 200',
      value: '#e5e7eb',
      cssVar: '--color-gray-200',
      tailwindClass: 'bg-gray-200',
    },
    {
      name: 'Gray 300',
      value: '#d1d5db',
      cssVar: '--color-gray-300',
      tailwindClass: 'bg-gray-300',
    },
    {
      name: 'Gray 400',
      value: '#9ca3af',
      cssVar: '--color-gray-400',
      tailwindClass: 'bg-gray-400',
    },
    {
      name: 'Gray 500',
      value: '#6b7280',
      cssVar: '--color-gray-500',
      tailwindClass: 'bg-gray-500',
    },
    {
      name: 'Gray 600',
      value: '#4b5563',
      cssVar: '--color-gray-600',
      tailwindClass: 'bg-gray-600',
    },
    {
      name: 'Gray 700',
      value: '#374151',
      cssVar: '--color-gray-700',
      tailwindClass: 'bg-gray-700',
    },
    {
      name: 'Gray 800',
      value: '#1f2937',
      cssVar: '--color-gray-800',
      tailwindClass: 'bg-gray-800',
    },
    {
      name: 'Gray 900',
      value: '#111827',
      cssVar: '--color-gray-900',
      tailwindClass: 'bg-gray-900',
    },
    {
      name: 'Gray 950',
      value: '#030712',
      cssVar: '--color-gray-950',
      tailwindClass: 'bg-gray-950',
    },
  ],
  background: [
    {
      name: 'Primary',
      value: '#ffffff',
      cssVar: '--color-background-primary',
      tailwindClass: 'bg-background-primary',
    },
    {
      name: 'Secondary',
      value: '#f9fafb',
      cssVar: '--color-background-secondary',
      tailwindClass: 'bg-background-secondary',
    },
    {
      name: 'Tertiary',
      value: '#f3f4f6',
      cssVar: '--color-background-tertiary',
      tailwindClass: 'bg-background-tertiary',
    },
    {
      name: 'Dark',
      value: '#1f2937',
      cssVar: '--color-background-dark',
      tailwindClass: 'bg-background-dark',
    },
  ],
  text: [
    {
      name: 'Primary',
      value: '#111827',
      cssVar: '--color-text-primary',
      tailwindClass: 'text-text-primary',
    },
    {
      name: 'Secondary',
      value: '#6b7280',
      cssVar: '--color-text-secondary',
      tailwindClass: 'text-text-secondary',
    },
    {
      name: 'Tertiary',
      value: '#9ca3af',
      cssVar: '--color-text-tertiary',
      tailwindClass: 'text-text-tertiary',
    },
    {
      name: 'Inverse',
      value: '#ffffff',
      cssVar: '--color-text-inverse',
      tailwindClass: 'text-text-inverse',
    },
  ],
  border: [
    {
      name: 'Primary',
      value: '#e5e7eb',
      cssVar: '--color-border-primary',
      tailwindClass: 'border-border-primary',
    },
    {
      name: 'Secondary',
      value: '#d1d5db',
      cssVar: '--color-border-secondary',
      tailwindClass: 'border-border-secondary',
    },
    {
      name: 'Focus',
      value: '#3b82f6',
      cssVar: '--color-border-focus',
      tailwindClass: 'border-border-focus',
    },
  ],
};

/**
 * 타이포그래피 테스트 데이터
 */
export const TYPOGRAPHY: TypographyInfo[] = [
  {
    name: 'Heading 1',
    description: '36px, Bold',
    className: 'text-heading-1',
    sampleText: 'The quick brown fox jumps',
  },
  {
    name: 'Heading 2',
    description: '30px, Bold',
    className: 'text-heading-2',
    sampleText: 'The quick brown fox jumps',
  },
  {
    name: 'Heading 3',
    description: '24px, Semibold',
    className: 'text-heading-3',
    sampleText: 'The quick brown fox jumps',
  },
  {
    name: 'Heading 4',
    description: '20px, Semibold',
    className: 'text-heading-4',
    sampleText: 'The quick brown fox jumps',
  },
  {
    name: 'Heading 5',
    description: '18px, Semibold',
    className: 'text-heading-5',
    sampleText: 'The quick brown fox jumps',
  },
  {
    name: 'Heading 6',
    description: '16px, Semibold',
    className: 'text-heading-6',
    sampleText: 'The quick brown fox jumps',
  },
  {
    name: 'Body Large',
    description: '18px, Regular',
    className: 'text-body-large',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
  {
    name: 'Body',
    description: '16px, Regular',
    className: 'text-body',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
  {
    name: 'Body Small',
    description: '14px, Regular',
    className: 'text-body-small',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
  {
    name: 'Caption',
    description: '12px, Regular',
    className: 'text-caption',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
  {
    name: 'Caption Bold',
    description: '12px, Semibold',
    className: 'text-caption-bold',
    sampleText: 'The quick brown fox jumps over the lazy dog',
  },
  {
    name: 'Button',
    description: '14px, Medium',
    className: 'text-button',
    sampleText: 'Button Text',
  },
  {
    name: 'Button Large',
    description: '16px, Medium',
    className: 'text-button-large',
    sampleText: 'Button Text',
  },
  {
    name: 'Link',
    description: '16px, Medium, Underline',
    className: 'text-link',
    sampleText: 'Link Text',
  },
];

/**
 * Safe Area 테스트 데이터
 */
export const SAFE_AREA: SafeAreaInfo[] = [
  { name: 'Padding Top Safe', description: 'env(safe-area-inset-top)', className: 'pt-safe' },
  { name: 'Padding Bottom Safe', description: 'env(safe-area-inset-bottom)', className: 'pb-safe' },
  { name: 'Padding Left Safe', description: 'env(safe-area-inset-left)', className: 'pl-safe' },
  { name: 'Padding Right Safe', description: 'env(safe-area-inset-right)', className: 'pr-safe' },
  { name: 'Padding X Safe', description: 'Left + Right', className: 'px-safe' },
  { name: 'Padding Y Safe', description: 'Top + Bottom', className: 'py-safe' },
  { name: 'Padding All Safe', description: 'All sides', className: 'p-safe' },
  { name: 'Height Screen Safe', description: 'calc(100vh - insets)', className: 'h-screen-safe' },
  {
    name: 'Min Height Screen Safe',
    description: 'calc(100vh - insets)',
    className: 'min-h-screen-safe',
  },
];

/**
 * Z-Index 테스트 데이터
 */
export const Z_INDEX: ZIndexInfo[] = [
  { name: 'Base', value: '0', cssVar: '--z-base', description: '기본 레이어' },
  { name: 'Content', value: '1', cssVar: '--z-content', description: '콘텐츠 레이어' },
  { name: 'Elevated', value: '10', cssVar: '--z-elevated', description: '상승된 요소' },
  { name: 'Dropdown', value: '100', cssVar: '--z-dropdown', description: '드롭다운' },
  { name: 'Sticky', value: '200', cssVar: '--z-sticky', description: '고정 요소' },
  { name: 'Overlay', value: '300', cssVar: '--z-overlay', description: '오버레이' },
  { name: 'Modal', value: '1000', cssVar: '--z-modal', description: '모달' },
  { name: 'Popover', value: '1100', cssVar: '--z-popover', description: '팝오버' },
  { name: 'Tooltip', value: '1200', cssVar: '--z-tooltip', description: '툴팁' },
  { name: 'Toast', value: '9000', cssVar: '--z-toast', description: '토스트' },
  { name: 'Loading', value: '9100', cssVar: '--z-loading', description: '로딩' },
  { name: 'Debug', value: '9999', cssVar: '--z-debug', description: '디버그' },
];
