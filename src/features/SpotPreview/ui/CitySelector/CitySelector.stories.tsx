import type { Meta, StoryObj } from '@storybook/react-vite';
import { CitySelector } from './CitySelector';
import { cities } from '../../model/types';
import { API_SCENARIOS } from '../../../../../.storybook/api-decorator';

const meta = {
  title: 'Features/SpotPreview/CitySelector',
  component: CitySelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '도시를 선택할 수 있는 버튼 그룹 컴포넌트입니다.',
      },
    },
    // MSW 설정 (필요한 경우)
    api: API_SCENARIOS.DEFAULT,
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    cities: {
      control: 'object',
      description: '선택 가능한 도시 목록',
    },
    selected: {
      control: 'select',
      options: cities,
      description: '현재 선택된 도시',
    },
    onSelect: {
      action: 'city-selected',
      description: '도시 선택 시 호출되는 콜백',
    },
  },
} satisfies Meta<typeof CitySelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '✅ 기본 도시 선택기',
  args: {
    cities: cities,
    selected: 'All',
    onSelect: (city: string) => console.log('선택된 도시:', city),
  },
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
};

export const SeoulSelected: Story = {
  name: '🏙️ 서울 선택됨',
  args: {
    cities: cities,
    selected: 'Seoul',
    onSelect: (city: string) => console.log('선택된 도시:', city),
  },
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
};

export const BusanSelected: Story = {
  name: '🌊 부산 선택됨',
  args: {
    cities: cities,
    selected: 'Busan',
    onSelect: (city: string) => console.log('선택된 도시:', city),
  },
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
};

export const IncheonSelected: Story = {
  name: '✈️ 인천 선택됨',
  args: {
    cities: cities,
    selected: 'Incheon',
    onSelect: (city: string) => console.log('선택된 도시:', city),
  },
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
};

export const AllVariants: Story = {
  name: '🎨 모든 상태 쇼케이스',
  args: {
    cities: cities,
    selected: 'All',
    onSelect: (city: string) => console.log('선택된 도시:', city),
  },
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
  render: () => (
    <div className="space-y-6">
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-700 text-sm">🎯 각 도시별 선택 상태를 확인할 수 있습니다</p>
      </div>
      <div className="border border-gray-200 p-4 rounded-lg">
        <h4 className="text-sm font-medium mb-2">All 선택됨</h4>
        <CitySelector
          cities={cities}
          selected="All"
          onSelect={(city: string) => console.log('선택된 도시:', city)}
        />
      </div>
      <div className="border border-gray-200 p-4 rounded-lg">
        <h4 className="text-sm font-medium mb-2">Seoul 선택됨</h4>
        <CitySelector
          cities={cities}
          selected="Seoul"
          onSelect={(city: string) => console.log('선택된 도시:', city)}
        />
      </div>
      <div className="border border-gray-200 p-4 rounded-lg">
        <h4 className="text-sm font-medium mb-2">Busan 선택됨</h4>
        <CitySelector
          cities={cities}
          selected="Busan"
          onSelect={(city: string) => console.log('선택된 도시:', city)}
        />
      </div>
      <div className="border border-gray-200 p-4 rounded-lg">
        <h4 className="text-sm font-medium mb-2">Incheon 선택됨</h4>
        <CitySelector
          cities={cities}
          selected="Incheon"
          onSelect={(city: string) => console.log('선택된 도시:', city)}
        />
      </div>
    </div>
  ),
};
