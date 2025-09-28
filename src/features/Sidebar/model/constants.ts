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
