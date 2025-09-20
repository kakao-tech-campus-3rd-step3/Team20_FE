import type { Meta, StoryObj } from '@storybook/react-vite';
import { SAFE_AREA } from '../model/constants';

const meta = {
  title: 'Design System/Safe Area',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'CSS @utility에서 정의된 Safe Area 유틸리티입니다. 모바일 디바이스의 노치, 홈 인디케이터 등을 고려한 안전 영역 관련 스타일을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Safe Area 유틸리티 목록
export const AllUtilities: Story = {
  render: () => (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-heading-2 text-text-primary mb-4">Safe Area 유틸리티</h1>
        <p className="text-body text-text-secondary max-w-2xl mx-auto">
          모바일 디바이스의 노치, 홈 인디케이터 등을 고려한 Safe Area 관련 유틸리티입니다. 실제
          모바일 디바이스에서 확인하는 것이 좋습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SAFE_AREA.map((item) => (
          <div key={item.name} className="border border-border-secondary rounded-lg p-4 bg-white">
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
  ),
};

// 패딩 유틸리티만
export const PaddingUtilities: Story = {
  render: () => (
    <div className="p-6">
      <h2 className="text-heading-3 text-text-primary mb-6">Safe Area 패딩 유틸리티</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SAFE_AREA.filter((item) => item.name.includes('Padding')).map((item) => (
          <div key={item.name} className="bg-white border border-border-primary rounded-lg p-4">
            <h3 className="text-body font-semibold text-text-primary mb-2">{item.name}</h3>
            <p className="text-body-small text-text-secondary mb-3">{item.description}</p>
            <code className="bg-background-secondary px-2 py-1 rounded text-body-small text-text-primary font-mono mb-4 inline-block">
              {item.className}
            </code>

            {/* 패딩 시각화 */}
            <div className="border-2 border-dashed border-gray-300 rounded">
              <div
                className={`${item.className} bg-brand-primary/10 border border-brand-primary rounded min-h-16 flex items-center justify-center`}
              >
                <span className="text-caption text-brand-primary font-medium">
                  Safe Area 패딩 적용
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Safe Area 패딩 유틸리티들입니다. 디바이스의 안전 영역을 고려하여 패딩을 적용합니다.',
      },
    },
  },
};

// 높이 유틸리티만
export const HeightUtilities: Story = {
  render: () => (
    <div className="p-6">
      <h2 className="text-heading-3 text-text-primary mb-6">Safe Area 높이 유틸리티</h2>
      <div className="space-y-6">
        {SAFE_AREA.filter((item) => item.name.includes('Height')).map((item) => (
          <div key={item.name} className="bg-white border border-border-primary rounded-lg p-4">
            <div className="mb-4">
              <h3 className="text-body font-semibold text-text-primary mb-2">{item.name}</h3>
              <p className="text-body-small text-text-secondary mb-2">{item.description}</p>
              <code className="bg-background-secondary px-2 py-1 rounded text-body-small text-text-primary font-mono">
                {item.className}
              </code>
            </div>

            {/* 높이 시각화 (미니어처 버전) */}
            <div className="border border-border-secondary rounded bg-background-secondary p-2">
              <div className="text-caption text-text-tertiary mb-2">시각화 (실제 크기 아님)</div>
              <div
                className={`bg-brand-primary/20 border border-brand-primary rounded flex items-center justify-center`}
                style={{ height: '60px' }}
              >
                <span className="text-caption text-brand-primary font-medium">
                  {item.className} 적용
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Safe Area 높이 유틸리티들입니다. 디바이스의 안전 영역을 고려하여 높이를 계산합니다.',
      },
    },
  },
};

// 실제 사용 예시
export const UsageExample: Story = {
  render: () => (
    <div className="min-h-screen bg-background-secondary">
      {/* 헤더 */}
      <header className="bg-brand-primary text-white pt-safe px-safe">
        <div className="py-4">
          <h1 className="text-heading-4">Safe Area 적용 예시</h1>
          <p className="text-body-small opacity-90">상단에 pt-safe가 적용됨</p>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="px-safe py-6 flex-1">
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-heading-5 text-text-primary mb-4">메인 컨텐츠</h2>
          <p className="text-body text-text-secondary mb-4">
            이 영역은 px-safe가 적용되어 좌우 안전 영역을 고려합니다.
          </p>
          <div className="bg-background-tertiary p-4 rounded">
            <p className="text-body-small text-text-secondary">
              모바일 디바이스에서 노치나 곡면 모서리로 인해 잘릴 수 있는 영역을 피합니다.
            </p>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-800 text-white pb-safe px-safe">
        <div className="py-4">
          <p className="text-body-small">하단에 pb-safe가 적용됨</p>
          <p className="text-caption text-gray-400">홈 인디케이터 영역을 고려</p>
        </div>
      </footer>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Safe Area 유틸리티를 실제로 사용한 레이아웃 예시입니다.',
      },
    },
  },
};
