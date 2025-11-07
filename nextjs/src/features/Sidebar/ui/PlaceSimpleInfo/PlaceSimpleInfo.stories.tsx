import type { Meta, StoryObj } from '@storybook/nextjs';
import { PlaceSimpleInfo } from './PlaceSimpleInfo';

const meta = {
  title: 'Features/Sidebar/PlaceSimpleInfo',
  component: PlaceSimpleInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PlaceSimpleInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { rating: 4.7 } };
