import type { Meta, StoryObj } from '@storybook/react-vite';
import { MapPreview } from 'src/features/SpotPreview/ui/MapPreview';

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
  name: '기본 지도 미리보기',
  args: {
    city: 'All',
  },
};

export const Seoul: Story = {
  name: '서울 지도',
  args: {
    city: 'Seoul',
  },
};

export const Busan: Story = {
  name: '부산 지도',
  args: {
    city: 'Busan',
  },
};

export const Incheon: Story = {
  name: '인천 지도',
  args: {
    city: 'Incheon',
  },
};

export const AllCities: Story = {
  name: '모든 도시 쇼케이스',
  args: {
    city: 'All',
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-4xl">
      <div>
        <h4 className="text-sm font-medium mb-2">All</h4>
        <MapPreview city="All" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Seoul</h4>
        <MapPreview city="Seoul" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Busan</h4>
        <MapPreview city="Busan" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Incheon</h4>
        <MapPreview city="Incheon" />
      </div>
    </div>
  ),
};
