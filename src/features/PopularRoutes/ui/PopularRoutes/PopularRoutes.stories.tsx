import type { Meta, StoryObj } from '@storybook/react-vite';
import { PopularRoutes } from './PopularRoutes';

const meta = {
  title: 'Features/PopularRoutes',
  component: PopularRoutes,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '인기 여행 코스들을 그리드 형태로 보여주는 섹션 컴포넌트입니다. 각 코스는 이미지, 제목, 스팟 수, 공유 버튼을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PopularRoutes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 인기 코스 섹션',
  args: {},
};

export const RoutesShowcase: Story = {
  name: '코스 쇼케이스',
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">PopularRoutes 컴포넌트</h3>
        <PopularRoutes />
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
          <PopularRoutes />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">태블릿 크기 (2열)</h4>
        <div className="max-w-2xl">
          <PopularRoutes />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">데스크톱 크기 (2열)</h4>
        <div className="max-w-4xl">
          <PopularRoutes />
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
        <p className="text-sm text-gray-600 mb-4">
          각 코스 카드에 마우스를 올리면 그림자 효과가 나타납니다.
        </p>
        <PopularRoutes />
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
          Tab 키를 사용하여 "모두 보기" 링크와 각 코스의 "공유" 버튼 사이를 이동하고, Enter 키로
          선택할 수 있습니다.
        </p>
        <PopularRoutes />
      </div>
    </div>
  ),
};

export const FullWidthShowcase: Story = {
  name: '전체 너비 쇼케이스',
  render: () => (
    <div className="w-full">
      <PopularRoutes />
    </div>
  ),
};

export const CompactShowcase: Story = {
  name: '컴팩트 쇼케이스',
  render: () => (
    <div className="max-w-md">
      <PopularRoutes />
    </div>
  ),
};
