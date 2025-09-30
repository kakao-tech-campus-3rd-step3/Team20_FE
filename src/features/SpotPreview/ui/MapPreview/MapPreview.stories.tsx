import type { Meta, StoryObj } from '@storybook/react-vite';
import { MapPreview } from './MapPreview';
import { API_SCENARIOS } from '../../../../../.storybook/api-decorator';

const meta = {
  title: 'Features/SpotPreview/MapPreview',
  component: MapPreview,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '지도 미리보기를 보여주는 컴포넌트입니다. 현재는 플레이스홀더로 구현되어 있습니다.',
      },
    },
    // MSW 설정 (필요한 경우)
    api: API_SCENARIOS.DEFAULT,
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    city: {
      control: 'text',
      description: '표시할 도시명',
    },
  },
} satisfies Meta<typeof MapPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '✅ 기본 지도 미리보기',
  args: {
    city: 'All',
  },
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
};

export const Seoul: Story = {
  name: '🏙️ 서울 지도',
  args: {
    city: 'Seoul',
  },
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
};

export const Busan: Story = {
  name: '🌊 부산 지도',
  args: {
    city: 'Busan',
  },
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
};

export const Incheon: Story = {
  name: '✈️ 인천 지도',
  args: {
    city: 'Incheon',
  },
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
};

export const AllCities: Story = {
  name: '🗺️ 모든 도시 쇼케이스',
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
  render: () => (
    <div className="max-w-4xl">
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-700 text-sm">
          🌍 각 도시별 지도 미리보기 플레이스홀더를 확인합니다
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-200 p-4 rounded-lg">
          <h4 className="text-sm font-medium mb-2">All</h4>
          <MapPreview city="All" />
        </div>
        <div className="border border-gray-200 p-4 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Seoul</h4>
          <MapPreview city="Seoul" />
        </div>
        <div className="border border-gray-200 p-4 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Busan</h4>
          <MapPreview city="Busan" />
        </div>
        <div className="border border-gray-200 p-4 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Incheon</h4>
          <MapPreview city="Incheon" />
        </div>
      </div>
    </div>
  ),
};
