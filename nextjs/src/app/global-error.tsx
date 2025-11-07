'use client';

import { ErrorBoundaryFallback } from '@/shared/ui/ErrorBoundary/ui/ErrorBoundaryFallback';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <ErrorBoundaryFallback error={error} onReset={reset} />
      </body>
    </html>
  );
}