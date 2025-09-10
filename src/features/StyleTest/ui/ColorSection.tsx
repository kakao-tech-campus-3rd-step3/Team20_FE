import type { ColorInfo } from '../model/types';

interface ColorSectionProps {
  title: string;
  colors: ColorInfo[];
}

export function ColorSection({ title, colors }: ColorSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-heading-3 text-text-primary mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {colors.map((color) => (
          <div
            key={color.name}
            className="bg-white rounded-lg shadow-sm border border-border-primary overflow-hidden"
          >
            {/* 색상 미리보기 */}
            <div
              className={`h-20 w-full ${color.tailwindClass}`}
              style={{ backgroundColor: color.value }}
            />

            {/* 색상 정보 */}
            <div className="p-4">
              <h3 className="text-body font-semibold text-text-primary mb-2">{color.name}</h3>
              <div className="space-y-1 text-body-small">
                <div className="flex justify-between">
                  <span className="text-text-secondary">HEX:</span>
                  <code className="bg-background-secondary px-2 py-1 rounded text-text-primary font-mono">
                    {color.value}
                  </code>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">CSS Var:</span>
                  <code className="bg-background-secondary px-2 py-1 rounded text-text-primary font-mono">
                    {color.cssVar}
                  </code>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Class:</span>
                  <code className="bg-background-secondary px-2 py-1 rounded text-text-primary font-mono">
                    {color.tailwindClass}
                  </code>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
