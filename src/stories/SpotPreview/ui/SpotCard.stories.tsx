import type { Meta, StoryObj } from '@storybook/react-vite';
import { SpotCard } from 'src/features/SpotPreview/ui/SpotCard';

const meta = {
  title: 'Features/SpotPreview/SpotCard',
  component: SpotCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '선택된 스팟의 정보와 액션 버튼들을 보여주는 카드 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpotCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 스팟 카드',
  args: {},
};

export const CardShowcase: Story = {
  name: '카드 쇼케이스',
  render: () => (
    <div className="max-w-md">
      <SpotCard />
    </div>
  ),
};

export const ResponsiveShowcase: Story = {
  name: '반응형 쇼케이스',
  render: () => (
    <div className="space-y-4">
      <div className="max-w-xs">
        <h4 className="text-sm font-medium mb-2">작은 크기</h4>
        <SpotCard />
      </div>
      <div className="max-w-md">
        <h4 className="text-sm font-medium mb-2">중간 크기</h4>
        <SpotCard />
      </div>
      <div className="max-w-lg">
        <h4 className="text-sm font-medium mb-2">큰 크기</h4>
        <SpotCard />
      </div>
    </div>
  ),
};
