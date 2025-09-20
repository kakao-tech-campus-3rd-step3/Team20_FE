import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlaceThumbnail } from './PlaceThumbnail';
import { MOCK_PLACES } from '@/__mocks__/mockPlace';

const meta = {
  title: 'Features/Sidebar/PlaceThumbnail',
  component: PlaceThumbnail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PlaceThumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: { ...MOCK_PLACES[0], badgeNumber: 1 },
};

export const Fallback: Story = {
  args: { name: '촬영지', thumbnailUrl: '', badgeNumber: 2 },
};
