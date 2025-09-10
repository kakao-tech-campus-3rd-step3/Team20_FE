import type { SafeAreaInfo } from '../model/types';

interface SafeAreaSectionProps {
  safeArea: SafeAreaInfo[];
}

export function SafeAreaSection({ safeArea }: SafeAreaSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-heading-3 text-text-primary mb-6">Safe Area 유틸리티</h2>
      <div className="bg-white rounded-lg shadow-sm border border-border-primary p-6">
        <p className="text-body text-text-secondary mb-6">
          모바일 디바이스의 노치, 홈 인디케이터 등을 고려한 Safe Area 관련 유틸리티입니다. 실제
          모바일 디바이스에서 확인하는 것이 좋습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {safeArea.map((item) => (
            <div key={item.name} className="border border-border-secondary rounded-lg p-4">
              <h3 className="text-body font-semibold text-text-primary mb-2">{item.name}</h3>
              <p className="text-body-small text-text-secondary mb-2">{item.description}</p>
              <code className="bg-background-secondary px-2 py-1 rounded text-body-small text-text-primary font-mono">
                {item.className}
              </code>

              {/* 시각적 예시 */}
              <div className="mt-4 border border-border-primary rounded bg-background-secondary">
                <div
                  className={`${item.className} bg-brand-primary/20 min-h-8 rounded flex items-center justify-center`}
                >
                  <span className="text-caption text-text-secondary">적용 영역</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
