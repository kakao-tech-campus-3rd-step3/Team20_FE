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

export const HomeActive: Story = {
  args: {
    active: 'home',
  },
};

export const MapActive: Story = {
  args: {
    active: 'map',
  },
};

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
