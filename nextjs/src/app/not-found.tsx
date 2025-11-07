'use client';

import { Home, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();
  const btnBase =
    'inline-flex items-center justify-center gap-[var(--spacing-2)] w-full py-[var(--spacing-3)] px-[var(--spacing-6)] rounded-lg font-medium transition-colors duration-200 text-button-large';

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background-primary)] flex items-center justify-center px-[var(--spacing-4)]">
      <main className="max-w-md w-full text-center">
        <header className="mb-[var(--spacing-8)]">
          <div className="mx-auto w-32 h-32 rounded-full flex items-center justify-center mb-[var(--spacing-4)] bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] shadow-[var(--shadow-brand-lg)]">
            <Search className="w-16 h-16 text-[var(--color-brand-secondary)]" aria-hidden="true" />
          </div>

          <div
            className="text-6xl font-bold text-[var(--color-text-primary)] mb-[var(--spacing-2)]"
            aria-hidden="true"
          >
            404
          </div>
          <h1 className="text-heading-2 text-[var(--color-text-primary)] mb-[var(--spacing-4)]">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-[var(--color-text-secondary)] text-body-large leading-relaxed">
            요청하신 페이지가 존재하지 않거나
            <br />
            이동되었을 수 있습니다.
          </p>
        </header>

        <div className="space-y-[var(--spacing-4)]">
          <Link
            href="/"
            className={`${btnBase} bg-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-tertiary)] text-[var(--color-text-inverse)] shadow-[var(--shadow-button-hover)]`}
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            홈으로 돌아가기
          </Link>

          <button
            onClick={goBack}
            className={`${btnBase} bg-[var(--color-background-secondary)] hover:bg-[var(--color-background-tertiary)] text-[var(--color-text-primary)] shadow-[var(--shadow-button)]`}
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            이전 페이지로
          </button>
        </div>

        <section className="mt-[var(--spacing-12)] pt-[var(--spacing-8)] border-t border-[var(--color-border-primary)]">
          <h2 className="text-heading-5 text-[var(--color-text-primary)] mb-[var(--spacing-4)]">
            도움이 필요하신가요?
          </h2>
          <ul className="space-y-[var(--spacing-2)] text-body-small text-[var(--color-text-tertiary)]">
            <li>• URL을 다시 확인해보세요</li>
            <li>• 홈페이지에서 원하는 콘텐츠를 찾아보세요</li>
            <li>• 문제가 지속되면 고객센터에 문의해주세요</li>
          </ul>
        </section>
      </main>
    </div>
  );
}