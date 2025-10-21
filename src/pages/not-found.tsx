import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { Home, ArrowLeft, Search } from 'lucide-react';

export const Route = createFileRoute('/not-found')({
  component: NotFoundPage,
});

export function NotFoundPage() {
  const router = useRouter();
  const btnBase =
    'inline-flex items-center justify-center gap-(--spacing-2) w-full py-(--spacing-3) px-(--spacing-6) rounded-lg font-medium transition-colors duration-200 text-button-large';

  const goBack = () => {
    if (window.history.length > 1) {
      router.history.back();
    } else {
      router.navigate({ to: '/' });
    }
  };

  return (
    <div className="min-h-screen bg-(--color-background-primary) flex items-center justify-center px-(--spacing-4)">
      <main className="max-w-md w-full text-center">
        <header className="mb-(--spacing-8)">
          <div className="mx-auto w-32 h-32 rounded-full flex items-center justify-center mb-(--spacing-4) bg-gradient-to-br from-(--color-brand-primary) to-(--color-brand-secondary) shadow-(--shadow-brand-lg)">
            <Search className="w-16 h-16 text-(--color-brand-secondary)" aria-hidden="true" />
          </div>

          <div
            className="text-6xl font-bold text-(--color-text-primary) mb-(--spacing-2)"
            aria-hidden="true"
          >
            404
          </div>
          <h1 className="text-heading-2 text-(--color-text-primary) mb-(--spacing-4)">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-(--color-text-secondary) text-body-large leading-relaxed">
            요청하신 페이지가 존재하지 않거나
            <br />
            이동되었을 수 있습니다.
          </p>
        </header>

        <div className="space-y-(--spacing-4)">
          <Link
            to="/"
            className={`${btnBase} bg-(--color-brand-secondary) hover:bg-(--color-brand-tertiary) text-(--color-text-inverse) shadow-(--shadow-button-hover)`}
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            홈으로 돌아가기
          </Link>

          <button
            onClick={goBack}
            className={`${btnBase} bg-(--color-background-secondary) hover:bg-(--color-background-tertiary) text-(--color-text-primary) shadow-(--shadow-button)`}
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            이전 페이지로
          </button>
        </div>

        <section className="mt-(--spacing-12) pt-(--spacing-8) border-t border-(--color-border-primary)">
          <h2 className="text-heading-5 text-(--color-text-primary) mb-(--spacing-4)">
            도움이 필요하신가요?
          </h2>
          <ul className="space-y-(--spacing-2) text-body-small text-(--color-text-tertiary)">
            <li>• URL을 다시 확인해보세요</li>
            <li>• 홈페이지에서 원하는 콘텐츠를 찾아보세요</li>
            <li>• 문제가 지속되면 고객센터에 문의해주세요</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
