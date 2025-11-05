export const OVERLAY_DEFAULTS = {
  name: '장소명',
  address: '주소 정보 없음',
  description: '',
} as const;

export const OVERLAY_STYLES = {
  container:
    'position: relative; background: var(--color-background-primary); border-radius: 8px; box-shadow: var(--shadow-card); border: 1px solid var(--color-border-primary); width: min(90vw, 400px); max-width: 400px; min-width: 280px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;',
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

export const KOREA_BOUNDS = {
  north: 38.45,
  south: 33.2,
  east: 131.9,
  west: 124.1,
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
    'absolute top-[96px] right-(--spacing-4) z-(--z-elevated) flex flex-col items-end gap-(--spacing-2)',
  BUTTON_BASE:
    'flex items-center gap-(--spacing-2) px-(--spacing-3) py-(--spacing-2) rounded-full shadow-(--shadow-card) transition-all duration-200',
  ICON: 'w-(--spacing-4) h-(--spacing-4)',
  TEXT: 'text-sm font-medium whitespace-nowrap',
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
    'absolute bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 shadow-lg h-[85vh] rounded-t-2xl',
  HEADER: 'flex items-center justify-between p-4 border-b border-gray-200',
  TITLE: 'text-lg font-semibold text-gray-900',
  CONTENT: 'flex-1 overflow-y-auto h-[calc(85vh-80px)]',
} as const;

export const MOBILE_SEARCH_BAR_STYLES = {
  CONTAINER:
    'absolute top-0 left-0 right-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-2 py-1 shadow-sm',
  WRAPPER: 'scale-90 origin-top',
} as const;

export const IMAGE_FALLBACK_SVG =
  '<svg style="width: 24px; height: 24px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>';

export const IMAGE_FALLBACK_HIDDEN = `<div class="overlay-fallback" style="width: 100%; height: 100%; display: none; align-items: center; justify-content: center; color: var(--color-text-tertiary);">${IMAGE_FALLBACK_SVG}</div>`;

export const IMAGE_FALLBACK_VISIBLE = `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: var(--color-text-tertiary);">${IMAGE_FALLBACK_SVG}</div>`;
