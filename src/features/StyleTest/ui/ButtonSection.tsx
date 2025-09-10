import { TestButton } from './TestButton';

export function ButtonSection() {
  const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info'] as const;
  const sizes = ['small', 'medium', 'large'] as const;

  return (
    <section className="mb-12">
      <h2 className="text-heading-3 text-text-primary mb-6">버튼 컴포넌트</h2>

      {/* 버튼 변형들 */}
      <div className="bg-white rounded-lg shadow-sm border border-border-primary p-6 mb-6">
        <h3 className="text-heading-5 text-text-primary mb-4">버튼 변형</h3>
        <div className="flex flex-wrap gap-4">
          {variants.map((variant) => (
            <TestButton key={variant} variant={variant}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </TestButton>
          ))}
        </div>
      </div>

      {/* 버튼 크기들 */}
      <div className="bg-white rounded-lg shadow-sm border border-border-primary p-6 mb-6">
        <h3 className="text-heading-5 text-text-primary mb-4">버튼 크기</h3>
        <div className="flex flex-wrap items-center gap-4">
          {sizes.map((size) => (
            <TestButton key={size} size={size}>
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </TestButton>
          ))}
        </div>
      </div>

      {/* 버튼 상태들 */}
      <div className="bg-white rounded-lg shadow-sm border border-border-primary p-6">
        <h3 className="text-heading-5 text-text-primary mb-4">버튼 상태</h3>
        <div className="flex flex-wrap gap-4">
          <TestButton>기본 상태</TestButton>
          <TestButton className="hover:bg-brand-tertiary">Hover 상태 (마우스 올려보기)</TestButton>
          <TestButton className="focus:ring-4">Focus 상태 (클릭해보기)</TestButton>
          <button
            disabled
            className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed text-button"
          >
            Disabled 상태
          </button>
        </div>
      </div>
    </section>
  );
}
