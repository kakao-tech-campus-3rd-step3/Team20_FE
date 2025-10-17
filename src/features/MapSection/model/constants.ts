export const OVERLAY_DEFAULTS = {
  name: '장소명',
  address: '주소 정보 없음',
  description: '',
} as const;

export const OVERLAY_STYLES = {
  container:
    'position: relative; background: var(--color-background-primary); border-radius: 8px; box-shadow: var(--shadow-card); border: 1px solid var(--color-border-primary); min-width: 300px; max-width: 400px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;',
  header:
    'display: flex; align-items: center; justify-content: space-between; padding: var(--spacing-4); border-bottom: 1px solid var(--color-border-primary);',
  title:
    'font-size: 1.125rem; font-weight: 600; color: var(--color-text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; margin-right: var(--spacing-2);',
  closeButton:
    'flex-shrink: 0; padding: var(--spacing-1); background: none; border: none; border-radius: 50%; cursor: pointer; transition: background-color 0.2s;',
  content: 'padding: var(--spacing-4);',
  body: 'display: flex; gap: var(--spacing-3);',
  thumbnail: 'flex-shrink: 0;',
  thumbnailImage:
    'width: 64px; height: 64px; background-color: var(--color-background-tertiary); border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center;',
  info: 'flex: 1; min-width: 0;',
  address:
    'font-size: 0.875rem; color: var(--color-text-secondary); margin-bottom: var(--spacing-2); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
  scene:
    'background-color: var(--color-background-secondary); border-radius: 8px; padding: var(--spacing-3); margin-bottom: var(--spacing-3);',
  sceneHeader:
    'display: flex; align-items: center; gap: var(--spacing-1); margin-bottom: var(--spacing-1);',
  sceneIcon: 'width: 12px; height: 12px; color: var(--color-brand-secondary);',
  sceneLabel: 'font-size: 0.75rem; font-weight: 600; color: var(--color-brand-secondary);',
  sceneDescription:
    'font-size: 0.75rem; color: var(--color-brand-secondary); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;',
  relatedContents: 'margin-bottom: var(--spacing-2);',
  relatedContentsText:
    'font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: var(--spacing-1);',
} as const;

export const MAP_DEFAULTS = {
  center: { lat: 36.0, lng: 127.5 },
  level: 13,
  draggable: false,
  scrollwheel: false,
  disableDoubleClickZoom: true,
} as const;

export const SDK_CONFIG = {
  timeout: 15000,
  checkInterval: 100,
} as const;

export const MARKER_CONFIG = {
  SIZE: 40,
  BACKGROUND_COLOR: '#FF6B6B',
  BORDER_COLOR: '#FFFFFF',
  BORDER_WIDTH: 3,
  TEXT_COLOR: '#FFFFFF',
  FONT: 'bold 16px Arial',
} as const;

export const POLYLINE_CONFIG = {
  STROKE_COLOR: '#FF6B6B',
  STROKE_WEIGHT: 3,
  STROKE_OPACITY: 0.8,
} as const;

export const MOBILE_BUTTON_STYLES = {
  CONTAINER:
    'absolute bottom-(--spacing-4) left-1/2 transform -translate-x-1/2 z-(--z-elevated) flex gap-(--spacing-2)',
  BUTTON_BASE:
    'flex items-center gap-(--spacing-2) px-(--spacing-4) py-(--spacing-3) rounded-full shadow-(--shadow-card) transition-all duration-200',
  ICON: 'w-(--spacing-5) h-(--spacing-5)',
  TEXT: 'text-sm font-medium',
  BADGE:
    'bg-(--color-semantic-error) text-(--color-text-inverse) text-xs rounded-full px-(--spacing-2) py-(--spacing-1) min-w-[20px] text-center',
} as const;

export const BUTTON_VARIANTS = {
  ACTIVE:
    'bg-(--color-brand-primary) text-(--color-text-inverse) hover:bg-(--color-brand-secondary)',
  INACTIVE:
    'bg-(--color-background-primary) text-(--color-text-primary) hover:bg-(--color-brand-primary) hover:text-(--color-text-inverse)',
} as const;

export const MOBILE_SIDEBAR_STYLES = {
  CONTAINER:
    'absolute bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 shadow-lg max-h-[60vh] rounded-t-2xl',
  HEADER: 'flex items-center justify-between p-4 border-b border-gray-200',
  TITLE: 'text-lg font-semibold text-gray-900',
  CLOSE_BUTTON: 'p-2 hover:bg-gray-100 rounded-full transition-colors',
  CLOSE_ICON: 'w-5 h-5 text-gray-500',
  CONTENT: 'flex-1 overflow-y-auto max-h-[50vh]',
} as const;
