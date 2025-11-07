'use client';

import { CLOSE_BUTTON_STYLES } from '../../model/constants';

interface CloseButtonProps {
  onClick: () => void;
}

export function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button onClick={onClick} className={CLOSE_BUTTON_STYLES.BUTTON}>
      <svg
        className={CLOSE_BUTTON_STYLES.ICON}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={CLOSE_BUTTON_STYLES.ICON_PATH}
        />
      </svg>
    </button>
  );
}

