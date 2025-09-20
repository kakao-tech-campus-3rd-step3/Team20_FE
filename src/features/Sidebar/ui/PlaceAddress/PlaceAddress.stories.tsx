import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlaceAddress } from './PlaceAddress';

const meta = {
  title: 'Features/Sidebar/PlaceAddress',
  component: PlaceAddress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PlaceAddress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { address: '경기도 안산시 상록구' },
};
