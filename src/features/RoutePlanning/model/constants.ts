export const DRAG_STYLES = {
  CONTAINER: {
    touchAction: 'pan-y',
    overscrollBehavior: 'contain',
  },
  BODY_DRAGGING: {
    overflow: 'hidden',
    touchAction: 'none',
  },
} as const;
