'use client';

import { ErrorBoundary } from './ErrorBoundary';
import type { ErrorBoundaryProps } from '../model/types';

interface PageErrorBoundaryProps extends Omit<ErrorBoundaryProps, 'onError'> {
  pageName?: string;
}

export function PageErrorBoundary({ pageName, children, ...props }: PageErrorBoundaryProps) {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // 페이지별 에러 로깅
    console.error(`Error in ${pageName || 'Unknown Page'}:`, error, errorInfo);
    
    // 여기에 에러 로깅 서비스 연동 가능
    // 예: Sentry, LogRocket 등
  };

  return (
    <ErrorBoundary onError={handleError} {...props}>
      {children}
    </ErrorBoundary>
  );
}