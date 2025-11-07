'use client';

import { Button } from '../../Button/Button';
import { ERROR_BOUNDARY_MESSAGES, ERROR_BOUNDARY_STYLES } from '../model/constants';
import type { ErrorBoundaryFallbackProps } from '../model/types';

export function ErrorBoundaryFallback({ error, onReset }: ErrorBoundaryFallbackProps) {
  return (
    <div className={ERROR_BOUNDARY_STYLES.CONTAINER}>
      <div className={ERROR_BOUNDARY_STYLES.CONTENT}>
        <div className={ERROR_BOUNDARY_STYLES.ICON_CONTAINER}>
          <svg
            className={ERROR_BOUNDARY_STYLES.ICON}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className={ERROR_BOUNDARY_STYLES.TITLE}>{ERROR_BOUNDARY_MESSAGES.TITLE}</h2>
        <p className={ERROR_BOUNDARY_STYLES.DESCRIPTION}>{ERROR_BOUNDARY_MESSAGES.DESCRIPTION}</p>
        <div className={ERROR_BOUNDARY_STYLES.BUTTON_CONTAINER}>
          <Button variant="default" onClick={onReset} className={ERROR_BOUNDARY_STYLES.BUTTON}>
            {ERROR_BOUNDARY_MESSAGES.RETRY_BUTTON}
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className={ERROR_BOUNDARY_STYLES.BUTTON}
          >
            {ERROR_BOUNDARY_MESSAGES.RELOAD_BUTTON}
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className={ERROR_BOUNDARY_STYLES.DEVELOPER_DETAILS}>
            <summary className={ERROR_BOUNDARY_STYLES.DEVELOPER_SUMMARY}>
              {ERROR_BOUNDARY_MESSAGES.DEVELOPER_INFO}
            </summary>
            <pre className={ERROR_BOUNDARY_STYLES.DEVELOPER_PRE}>
              {error.message}
              {'\n\n'}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}