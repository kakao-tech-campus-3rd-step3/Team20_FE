import type { Meta, StoryObj } from '@storybook/react-vite';
import { Brand } from './Brand';

const meta = {
  title: 'Features/Header/Brand',
  component: Brand,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Brand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnDarkBackground: Story = {
  render: () => (
    <div className="bg-gray-900 p-8">
      <Brand />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
