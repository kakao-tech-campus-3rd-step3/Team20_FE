export const DEFAULT_PLACE_RATING = 4.8;
export const DEFAULT_RESULT_COUNT = 4;
export const DEFAULT_AVG_RATING = 4.6;
export const DEFAULT_DURATION_RANGE = [2, 3] as const;

export const SIDEBAR_DIMENSIONS = {
  WIDTH: 'w-96',
  WIDTH_RESPONSIVE: 'w-full lg:w-96',
  ICON_SIZE: 'w-16 h-16',
  ICON_SIZE_SMALL: 'w-12 h-12',
} as const;

export const ROUTE_CARD_STYLES = {
  ORDER_BADGE:
    'text-sm font-medium text-(--color-brand-primary) bg-(--color-brand-primary)/10 px-2 py-1 rounded-full',
  DRAG_HANDLE: 'w-4 h-4 text-(--color-text-tertiary) cursor-grab',
  REMOVE_BUTTON:
    'p-1 text-(--color-text-tertiary) hover:text-(--color-semantic-error) hover:bg-(--color-semantic-error)/10 rounded transition-colors',
} as const;

export const ROUTE_SIDEBAR_STYLES = {
  CONTAINER:
    'bg-(--color-background-primary) shadow-(--shadow-card) rounded-l-2xl overflow-hidden h-full flex flex-col border-l border-(--color-border-primary)',
  HEADER_GRADIENT:
    'bg-gradient-to-r from-(--color-brand-secondary) to-(--color-brand-tertiary) text-(--color-text-inverse)',
  FOOTER_CONTAINER: 'bg-(--color-background-secondary) border-t border-(--color-border-primary)',
  SAVE_BUTTON:
    'w-full flex items-center justify-center gap-(--spacing-2) px-(--spacing-4) py-(--spacing-3) rounded-lg text-sm font-medium bg-(--color-brand-primary) text-(--color-text-inverse) hover:bg-(--color-brand-secondary) transition-colors shadow-(--shadow-button) hover:shadow-(--shadow-button-hover)',
} as const;
