import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategorySection } from 'src/features/CategorySection';

const meta = {
  title: 'Features/CategorySection',
  component: CategorySection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'K-콘텐츠 카테고리들을 그리드 형태로 보여주는 섹션 컴포넌트입니다. K-Drama, K-Movie, K-POP 카테고리를 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CategorySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 카테고리 섹션',
  args: {},
};

export const CategoryShowcase: Story = {
  name: '카테고리 쇼케이스',
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">CategorySection 컴포넌트</h3>
        <CategorySection />
      </div>
    </div>
  ),
};

export const ResponsiveShowcase: Story = {
  name: '반응형 쇼케이스',
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2">모바일 크기 (1열)</h4>
        <div className="max-w-sm">
          <CategorySection />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">태블릿 크기 (3열)</h4>
        <div className="max-w-4xl">
          <CategorySection />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">데스크톱 크기 (3열)</h4>
        <div className="max-w-6xl">
          <CategorySection />
        </div>
      </div>
    </div>
  ),
};

export const InteractiveShowcase: Story = {
  name: '인터랙티브 쇼케이스',
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">호버 및 포커스 효과</h4>
        <CategorySection />
      </div>
    </div>
  ),
};

export const AccessibilityShowcase: Story = {
  name: '접근성 쇼케이스',
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">키보드 네비게이션</h4>
        <p className="text-sm text-gray-600 mb-4">
          Tab 키를 사용하여 각 카테고리 카드 사이를 이동하고, Enter 키로 선택할 수 있습니다.
        </p>
        <CategorySection />
      </div>
    </div>
  ),
};

export const FullWidthShowcase: Story = {
  name: '전체 너비 쇼케이스',
  render: () => (
    <div className="w-full">
      <CategorySection />
    </div>
  ),
};
