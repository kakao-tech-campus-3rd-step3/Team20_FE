import type { Meta, StoryObj } from '@storybook/react-vite';
import { ServiceMainHero } from 'src/features/ServiceMainHero';

const meta = {
  title: 'Features/ServiceMainHero',
  component: ServiceMainHero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '서비스 메인 페이지의 히어로 섹션으로, 제목, 설명, 액션 버튼들을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ServiceMainHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 히어로 섹션',
  args: {},
};

export const HeroShowcase: Story = {
  name: '히어로 쇼케이스',
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">ServiceMainHero 컴포넌트</h3>
        <ServiceMainHero />
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
          <ServiceMainHero />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">태블릿 크기</h4>
        <div className="max-w-4xl">
          <ServiceMainHero />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">데스크톱 크기</h4>
        <div className="max-w-7xl">
          <ServiceMainHero />
        </div>
      </div>
    </div>
  ),
};

export const FullWidthShowcase: Story = {
  name: '전체 너비 쇼케이스',
  render: () => (
    <div className="w-full">
      <ServiceMainHero />
    </div>
  ),
};
