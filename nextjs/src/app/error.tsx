'use client';

import { ErrorBoundaryFallback } from '@/shared/ui/ErrorBoundary/ui/ErrorBoundaryFallback';
import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return <ErrorBoundaryFallback error={error} onReset={reset} />;
}