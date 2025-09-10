import type { ZIndexInfo } from '../model/types';

interface ZIndexSectionProps {
  zIndex: ZIndexInfo[];
}

export function ZIndexSection({ zIndex }: ZIndexSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-heading-3 text-text-primary mb-6">Z-Index 시스템</h2>
      <div className="bg-white rounded-lg shadow-sm border border-border-primary p-6">
        <p className="text-body text-text-secondary mb-6">
          프로젝트의 레이어링 시스템입니다. 일관된 z-index 값으로 요소들의 쌓임 순서를 관리합니다.
        </p>

        <div className="space-y-4">
          {zIndex.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-4 border border-border-secondary rounded-lg"
            >
              <div>
                <h3 className="text-body font-semibold text-text-primary">{item.name}</h3>
                <p className="text-body-small text-text-secondary">{item.description}</p>
              </div>

              <div className="text-right">
                <div className="text-body font-mono text-text-primary">{item.value}</div>
                <code className="text-body-small font-mono text-text-secondary">{item.cssVar}</code>
              </div>
            </div>
          ))}
        </div>

        {/* Z-Index 시각적 예시 */}
        <div className="mt-8">
          <h3 className="text-heading-5 text-text-primary mb-4">시각적 예시</h3>
          <div className="relative h-40 bg-background-secondary rounded-lg overflow-hidden">
            <div className="absolute inset-4 bg-gray-200 rounded flex items-center justify-center z-base">
              <span className="text-caption">Base (z-0)</span>
            </div>
            <div className="absolute top-6 left-6 w-24 h-24 bg-brand-primary rounded flex items-center justify-center z-content">
              <span className="text-caption text-white">Content (z-1)</span>
            </div>
            <div className="absolute top-8 left-8 w-20 h-20 bg-semantic-success rounded flex items-center justify-center z-elevated">
              <span className="text-caption text-white">Elevated (z-10)</span>
            </div>
            <div className="absolute top-10 left-10 w-16 h-16 bg-semantic-warning rounded flex items-center justify-center z-dropdown">
              <span className="text-caption text-white">Dropdown (z-100)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
