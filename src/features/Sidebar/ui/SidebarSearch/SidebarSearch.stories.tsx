import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarSearch } from './SidebarSearch';

const meta = {
  title: 'Features/Sidebar/SidebarSearch',
  component: SidebarSearch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SidebarSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
