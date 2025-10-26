/* ----------------------------- 디자인 토큰 ----------------------------- */
export const sizeClass = {
  sm: 'h-8 text-sm',
  md: 'h-10',
  lg: 'h-11 text-base',
} as const;

export const pxClass = {
  sm: 'px-3',
  md: 'px-4',
  lg: 'px-5',
} as const;

export const circleWH = {
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-11',
} as const;

export const iconSizeByControl = {
  sm: '1rem',
  md: '1.125rem',
  lg: '1.25rem',
} as const;

/* 유형별 스타일 클래스 - 브랜드 색상 시스템 적용 */
export const variantClass = {
  soft: 'bg-background text-foreground hover:text-primary hover:bg-secondary/20 border border-border',
  gradient:
    'text-primary-foreground bg-gradient-to-br from-primary to-accent shadow-brand-md hover:shadow-brand-lg border border-transparent',
  outline:
    'bg-transparent text-foreground border border-border hover:bg-secondary/20 hover:text-primary hover:border-primary/50',
  ghost: 'bg-transparent text-foreground hover:bg-secondary/20 hover:text-primary',
} as const;
