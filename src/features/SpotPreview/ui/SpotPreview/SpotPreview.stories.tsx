import type { Meta, StoryObj } from '@storybook/react-vite';
import { SpotPreview } from './SpotPreview';
import { API_SCENARIOS } from '../../../../../.storybook/api-decorator';

const meta = {
  title: 'Features/SpotPreview',
  component: SpotPreview,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '지도와 스팟 정보를 미리보기로 보여주는 컴포넌트입니다. 도시 선택기, 지도 미리보기, 스팟 카드를 포함합니다.',
      },
    },
    api: API_SCENARIOS.DEFAULT,
    controls: { disable: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SpotPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '✅ 기본 스팟 미리보기',
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
};

export const AllVariants: Story = {
  name: '🎨 전체 컴포넌트 쇼케이스',
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
  render: () => (
    <div className="space-y-8">
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-700 text-sm">
          🗺️ 도시 선택기, 지도 미리보기, 스팟 카드가 통합된 컴포넌트입니다
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">SpotPreview 컴포넌트</h3>
        <SpotPreview />
      </div>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  name: '🎮 인터랙티브 데모',
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
  render: () => (
    <div className="space-y-6">
      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-700 text-sm">
          🎯 도시 선택 버튼을 클릭하여 지도 미리보기가 변경되는 것을 확인하세요
        </p>
      </div>
      <SpotPreview />
    </div>
  ),
};
