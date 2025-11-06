import type { Meta, StoryObj } from '@storybook/react-vite';
import { FooterBottom } from './FooterBottom';

const meta = {
  title: 'Features/Footer/FooterBottom',
  component: FooterBottom,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FooterBottom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="bg-gray-900">
      <FooterBottom />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
