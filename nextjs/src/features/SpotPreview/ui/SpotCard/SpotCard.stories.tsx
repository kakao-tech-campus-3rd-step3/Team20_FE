import type { Meta, StoryObj } from '@storybook/nextjs';
import { SpotCard } from './SpotCard';
import { API_SCENARIOS } from '../../../../../.storybook/api-decorator.js';

const meta = {
  title: 'Features/SpotPreview/SpotCard',
  component: SpotCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '선택된 스팟의 정보와 액션 버튼들을 보여주는 카드 컴포넌트입니다. NextJS Link를 사용합니다.',
      },
    },
    // NextJS Router와 MSW 설정
    api: API_SCENARIOS.DEFAULT,
    controls: { disable: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpotCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '✅ 기본 스팟 카드',
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
};

export const CardShowcase: Story = {
  name: '🎨 카드 쇼케이스',
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
  render: () => (
    <div className="max-w-md">
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-700 text-sm">
          🏷️ 선택된 스팟의 정보와 액션 버튼들을 표시하는 카드입니다
        </p>
      </div>
      <SpotCard />
    </div>
  ),
};

export const ResponsiveShowcase: Story = {
  name: '📱 반응형 쇼케이스',
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
  render: () => (
    <div className="space-y-4">
      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-700 text-sm">
          📐 다양한 크기에서의 스팟 카드 레이아웃을 확인합니다
        </p>
      </div>
      <div className="max-w-xs border border-gray-200 p-4 rounded-lg">
        <h4 className="text-sm font-medium mb-2">작은 크기</h4>
        <SpotCard />
      </div>
      <div className="max-w-md border border-gray-200 p-4 rounded-lg">
        <h4 className="text-sm font-medium mb-2">중간 크기</h4>
        <SpotCard />
      </div>
      <div className="max-w-lg border border-gray-200 p-4 rounded-lg">
        <h4 className="text-sm font-medium mb-2">큰 크기</h4>
        <SpotCard />
      </div>
    </div>
  ),
};
