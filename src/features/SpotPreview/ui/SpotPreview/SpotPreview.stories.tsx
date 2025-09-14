import type { Meta, StoryObj } from '@storybook/react-vite';
import { SpotPreview } from './SpotPreview';

const meta = {
  title: 'Features/SpotPreview',
  component: SpotPreview,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '지도와 스팟 정보를 미리보기로 보여주는 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpotPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 스팟 미리보기',
  args: {},
};

export const AllVariants: Story = {
  name: '모든 변형 쇼케이스',
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">SpotPreview 컴포넌트</h3>
        <SpotPreview />
      </div>
    </div>
  ),
};
