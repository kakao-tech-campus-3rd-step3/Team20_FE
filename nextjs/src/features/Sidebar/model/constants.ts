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

export const SIDEBAR_SEARCH_CLASSES = {
  CONTAINER: 'p-(--spacing-4)',
  BORDER_BOTTOM: 'border-b border-(--color-border-primary)',

  INPUT: [
    'w-full pl-10 pr-10 py-(--spacing-3)',
    'border border-(--color-border-primary) rounded-xl',
    'bg-(--color-background-primary)',
    'text-body text-(--color-text-primary)',
    'placeholder:text-(--color-text-tertiary)',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-focus) focus:border-transparent',
    'shadow-(--shadow-inset)',
  ].join(' '),

  SEARCH_ICON: 'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-(--color-text-tertiary)',
  CLEAR_BUTTON:
    'absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-(--color-text-tertiary) hover:text-(--color-text-secondary)',
  CLEAR_ICON: 'w-4 h-4',

  BOTTOM_SECTION: 'mt-(--spacing-2) text-caption text-(--color-text-secondary)',
  QUERY_TEXT: 'text-(--color-text-primary)',
} as const;

export const SIDEBAR_SEARCH_CONDITIONAL_CLASSES = {
  DESKTOP_ONLY: {
    BORDER_BOTTOM: SIDEBAR_SEARCH_CLASSES.BORDER_BOTTOM,
  },
} as const;

export const CLOSE_BUTTON_STYLES = {
  BUTTON: 'p-2 hover:bg-gray-100 rounded-full transition-colors',
  ICON: 'w-5 h-5 text-gray-500',
  ICON_PATH: 'M6 18L18 6M6 6l12 12',
} as const;