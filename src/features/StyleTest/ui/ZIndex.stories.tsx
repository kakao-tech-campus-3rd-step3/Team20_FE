import type { Meta, StoryObj } from '@storybook/react-vite';
import { Z_INDEX } from '../model/constants';

const meta = {
  title: 'Design System/Z-Index System',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'CSS @theme에서 정의된 Z-Index 시스템입니다. 프로젝트의 레이어링 시스템을 일관되게 관리합니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Z-Index 값 목록
export const AllValues: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h1 className="text-heading-2 text-text-primary mb-4">Z-Index 시스템</h1>
        <p className="text-body text-text-secondary max-w-2xl mx-auto">
          프로젝트의 레이어링 시스템입니다. 일관된 z-index 값으로 요소들의 쌓임 순서를 관리합니다.
        </p>
      </div>

      {Z_INDEX.map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-between p-4 border border-border-secondary rounded-lg bg-white"
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
  ),
};

// 기본 레이어들
export const BasicLayers: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-heading-3 text-text-primary">기본 레이어</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Z_INDEX.filter((item) => ['Base', 'Content', 'Elevated'].includes(item.name)).map(
          (item) => (
            <div key={item.name} className="p-4 border border-border-primary rounded-lg bg-white">
              <h3 className="text-body font-semibold text-text-primary mb-2">{item.name}</h3>
              <p className="text-body-small text-text-secondary mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <code className="text-body-small font-mono text-text-secondary">{item.cssVar}</code>
                <span className="text-body font-mono text-text-primary">{item.value}</span>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '기본적인 레이어들입니다. 일반적인 콘텐츠에서 사용됩니다.',
      },
    },
  },
};

// UI 컴포넌트 레이어들
export const UILayers: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-heading-3 text-text-primary">UI 컴포넌트 레이어</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Z_INDEX.filter((item) => ['Dropdown', 'Sticky', 'Overlay'].includes(item.name)).map(
          (item) => (
            <div key={item.name} className="p-4 border border-border-primary rounded-lg bg-white">
              <h3 className="text-body font-semibold text-text-primary mb-2">{item.name}</h3>
              <p className="text-body-small text-text-secondary mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <code className="text-body-small font-mono text-text-secondary">{item.cssVar}</code>
                <span className="text-body font-mono text-text-primary">{item.value}</span>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'UI 컴포넌트에서 사용되는 레이어들입니다.',
      },
    },
  },
};

// 모달 및 팝업 레이어들
export const ModalLayers: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-heading-3 text-text-primary">모달 및 팝업 레이어</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Z_INDEX.filter((item) => ['Modal', 'Popover', 'Tooltip'].includes(item.name)).map(
          (item) => (
            <div key={item.name} className="p-4 border border-border-primary rounded-lg bg-white">
              <h3 className="text-body font-semibold text-text-primary mb-2">{item.name}</h3>
              <p className="text-body-small text-text-secondary mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <code className="text-body-small font-mono text-text-secondary">{item.cssVar}</code>
                <span className="text-body font-mono text-text-primary">{item.value}</span>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모달, 팝오버, 툴팁 등 오버레이 요소들의 레이어입니다.',
      },
    },
  },
};

// 최상위 레이어들
export const TopLayers: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-heading-3 text-text-primary">최상위 레이어</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Z_INDEX.filter((item) => ['Toast', 'Loading', 'Debug'].includes(item.name)).map((item) => (
          <div key={item.name} className="p-4 border border-border-primary rounded-lg bg-white">
            <h3 className="text-body font-semibold text-text-primary mb-2">{item.name}</h3>
            <p className="text-body-small text-text-secondary mb-2">{item.description}</p>
            <div className="flex justify-between items-center">
              <code className="text-body-small font-mono text-text-secondary">{item.cssVar}</code>
              <span className="text-body font-mono text-text-primary">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '가장 높은 우선순위를 가지는 레이어들입니다.',
      },
    },
  },
};

// Z-Index 시각적 예시
export const VisualExample: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-heading-3 text-text-primary">시각적 레이어링 예시</h2>

      {/* 기본 레이어 예시 */}
      <div className="relative h-64 bg-background-secondary rounded-lg overflow-hidden p-4">
        <h3 className="text-heading-5 text-text-primary mb-4">기본 레이어 쌓임</h3>

        {/* Base Layer */}
        <div className="absolute inset-6 bg-gray-200 rounded flex items-center justify-center z-base">
          <div className="text-center">
            <div className="text-caption font-mono text-gray-600">z-base (0)</div>
            <div className="text-body-small text-gray-700">Base Layer</div>
          </div>
        </div>

        {/* Content Layer */}
        <div className="absolute top-8 left-8 w-32 h-24 bg-brand-primary rounded flex items-center justify-center z-content">
          <div className="text-center">
            <div className="text-caption font-mono text-white">z-content (1)</div>
            <div className="text-body-small text-white">Content</div>
          </div>
        </div>

        {/* Elevated Layer */}
        <div className="absolute top-12 left-12 w-28 h-20 bg-semantic-success rounded flex items-center justify-center z-elevated">
          <div className="text-center">
            <div className="text-caption font-mono text-white">z-elevated (10)</div>
            <div className="text-body-small text-white">Elevated</div>
          </div>
        </div>

        {/* Dropdown Layer */}
        <div className="absolute top-16 left-16 w-24 h-16 bg-semantic-warning rounded flex items-center justify-center z-dropdown">
          <div className="text-center">
            <div className="text-caption font-mono text-white">z-dropdown (100)</div>
            <div className="text-body-small text-white">Dropdown</div>
          </div>
        </div>
      </div>

      {/* 사용 가이드 */}
      <div className="bg-white p-6 rounded-lg border border-border-primary">
        <h3 className="text-heading-5 text-text-primary mb-4">사용 가이드</h3>
        <div className="space-y-3 text-body-small">
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong>기본 레이어 (0-10):</strong> 일반적인 콘텐츠와 약간 상승된 요소들
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong>UI 컴포넌트 (100-300):</strong> 드롭다운, 고정 요소, 오버레이
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-semantic-warning rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong>모달/팝업 (1000-1200):</strong> 모달, 팝오버, 툴팁
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-semantic-error rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong>최상위 (9000+):</strong> 토스트, 로딩, 디버그 요소
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Z-Index 시스템의 시각적 예시와 사용 가이드입니다.',
      },
    },
  },
};
