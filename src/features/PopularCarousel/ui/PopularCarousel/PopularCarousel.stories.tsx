import type { Meta, StoryObj } from '@storybook/react-vite';
import { PopularCarousel } from 'src/features/PopularCarousel';

const meta = {
  title: 'Features/PopularCarousel',
  component: PopularCarousel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '인기 콘텐츠를 가로 스크롤 캐러셀로 보여주는 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PopularCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 인기 캐러셀',
  args: {},
};

export const CarouselShowcase: Story = {
  name: '캐러셀 쇼케이스',
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">PopularCarousel 컴포넌트</h3>
        <PopularCarousel />
      </div>
    </div>
  ),
};

export const ResponsiveShowcase: Story = {
  name: '반응형 쇼케이스',
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2">모바일 크기</h4>
        <div className="max-w-sm">
          <PopularCarousel />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">태블릿 크기</h4>
        <div className="max-w-2xl">
          <PopularCarousel />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">데스크톱 크기</h4>
        <div className="max-w-6xl">
          <PopularCarousel />
        </div>
      </div>
    </div>
  ),
};
