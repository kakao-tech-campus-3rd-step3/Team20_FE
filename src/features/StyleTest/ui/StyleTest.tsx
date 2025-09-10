import { COLORS, TYPOGRAPHY, SAFE_AREA, Z_INDEX } from '../model/constants';
import { ColorSection } from './ColorSection';
import { TypographySection } from './TypographySection';
import { ButtonSection } from './ButtonSection';
import { SafeAreaSection } from './SafeAreaSection';
import { ZIndexSection } from './ZIndexSection';

export function StyleTest() {
  return (
    <div className="min-h-screen bg-background-secondary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-heading-1 text-text-primary mb-4">CSS 스타일 시스템 테스트</h1>
          <p className="text-body-large text-text-secondary max-w-2xl mx-auto">
            TailwindCSS v4 CSS 방식으로 구현된 디자인 시스템을 확인하고 테스트할 수 있습니다.
          </p>
        </div>

        {/* 색상 섹션들 */}
        {Object.entries(COLORS).map(([categoryName, colors]) => (
          <ColorSection
            key={categoryName}
            title={`${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} 색상`}
            colors={colors}
          />
        ))}

        {/* 타이포그래피 섹션 */}
        <TypographySection typography={TYPOGRAPHY} />

        {/* 버튼 섹션 */}
        <ButtonSection />

        {/* Safe Area 섹션 */}
        <SafeAreaSection safeArea={SAFE_AREA} />

        {/* Z-Index 섹션 */}
        <ZIndexSection zIndex={Z_INDEX} />

        {/* 추가 예시 섹션 */}
        <section className="mb-12">
          <h2 className="text-heading-3 text-text-primary mb-6">종합 사용 예시</h2>

          {/* 카드 예시 */}
          <div className="bg-white rounded-lg shadow-custom-medium border border-border-primary p-6 mb-6">
            <h3 className="text-heading-4 text-text-primary mb-4">카드 컴포넌트 예시</h3>
            <p className="text-body text-text-secondary mb-4">
              다양한 CSS 유틸리티가 조합된 카드 컴포넌트입니다. 색상, 타이포그래피, 그림자 등이 함께
              사용되었습니다.
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-brand-primary text-white rounded-lg text-button hover:bg-brand-tertiary transition-colors">
                주요 액션
              </button>
              <button className="px-4 py-2 bg-background-tertiary text-text-primary border border-border-primary rounded-lg text-button hover:bg-background-secondary transition-colors">
                보조 액션
              </button>
            </div>
          </div>

          {/* 그리드 레이아웃 예시 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-background-primary border border-border-primary rounded-lg p-4">
              <div className="w-full h-32 bg-brand-primary/10 rounded mb-4"></div>
              <h4 className="text-heading-6 text-text-primary mb-2">Primary 테마</h4>
              <p className="text-body-small text-text-secondary">
                브랜드 주색상을 활용한 테마입니다.
              </p>
            </div>

            <div className="bg-background-primary border border-border-primary rounded-lg p-4">
              <div className="w-full h-32 bg-semantic-success/10 rounded mb-4"></div>
              <h4 className="text-heading-6 text-text-primary mb-2">Success 테마</h4>
              <p className="text-body-small text-text-secondary">
                성공 상태를 나타내는 테마입니다.
              </p>
            </div>

            <div className="bg-background-primary border border-border-primary rounded-lg p-4">
              <div className="w-full h-32 bg-gray-100 rounded mb-4"></div>
              <h4 className="text-heading-6 text-text-primary mb-2">Neutral 테마</h4>
              <p className="text-body-small text-text-secondary">중성적인 회색 계열 테마입니다.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
