import type { TypographyInfo } from '../model/types';

interface TypographySectionProps {
  typography: TypographyInfo[];
}

export function TypographySection({ typography }: TypographySectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-heading-3 text-text-primary mb-6">타이포그래피</h2>
      <div className="space-y-6">
        {typography.map((typo) => (
          <div
            key={typo.name}
            className="bg-white rounded-lg shadow-sm border border-border-primary p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* 타이포그래피 정보 */}
              <div className="md:w-1/3">
                <h3 className="text-body font-semibold text-text-primary mb-1">{typo.name}</h3>
                <p className="text-body-small text-text-secondary mb-2">{typo.description}</p>
                <code className="bg-background-secondary px-2 py-1 rounded text-body-small text-text-primary font-mono">
                  {typo.className}
                </code>
              </div>

              {/* 타이포그래피 미리보기 */}
              <div className="md:w-2/3">
                <div className={`${typo.className} text-text-primary`}>{typo.sampleText}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
