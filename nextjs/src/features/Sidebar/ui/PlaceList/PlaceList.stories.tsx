import type { Meta, StoryObj } from '@storybook/nextjs';
import { PlaceList } from './PlaceList';
import { MOCK_PLACES } from '@/__mocks__/mockPlace';

const meta = {
  title: 'Features/Sidebar/PlaceList',
  component: PlaceList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PlaceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { places: MOCK_PLACES },
};
