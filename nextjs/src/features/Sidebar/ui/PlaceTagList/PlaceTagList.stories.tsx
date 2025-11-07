import type { Meta, StoryObj } from '@storybook/nextjs';
import { PlaceTagList } from './PlaceTagList';

const meta = {
  title: 'Features/Sidebar/PlaceTagList',
  component: PlaceTagList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PlaceTagList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { tags: ['메인 촬영지', '학교', '게임'] },
};
