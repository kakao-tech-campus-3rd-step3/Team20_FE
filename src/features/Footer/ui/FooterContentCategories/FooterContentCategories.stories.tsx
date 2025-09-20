import type { Meta, StoryObj } from '@storybook/react-vite';
import { FooterContentCategories } from './FooterContentCategories';

const meta = {
  title: 'Features/Footer/FooterContentCategories',
  component: FooterContentCategories,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FooterContentCategories>;

export default meta;
type Story = StoryObj<typeof meta>;

// 다크 배경에서의 모습
export const Default: Story = {
  render: () => (
    <div className="bg-gray-900 p-8">
      <FooterContentCategories />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
