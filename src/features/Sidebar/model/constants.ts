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
