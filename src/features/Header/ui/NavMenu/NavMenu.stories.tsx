import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavMenu } from './NavMenu';

const meta = {
  title: 'Features/Header/NavMenu',
  component: NavMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: 'select',
      options: ['home', 'map'],
    },
  },
} satisfies Meta<typeof NavMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// 홈이 활성화된 상태 (Default 예정)
export const HomeActive: Story = {
  args: {
    active: 'home',
  },
};

// 지도가 활성화된 상태
export const MapActive: Story = {
  args: {
    active: 'map',
  },
};

// 모든 메뉴 상태 쇼케이스
export const AllStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">홈 활성화</h3>
        <NavMenu active="home" />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">지도 활성화</h3>
        <NavMenu active="map" />
      </div>
    </div>
  ),
};
