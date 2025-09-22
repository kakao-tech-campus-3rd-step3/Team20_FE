import type { Meta, StoryObj } from '@storybook/react-vite';
import { FooterBrand } from './FooterBrand';

const meta = {
  title: 'Features/Footer/FooterBrand',
  component: FooterBrand,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FooterBrand>;

export default meta;
type Story = StoryObj<typeof meta>;

// 다크 배경에서의 모습
export const Default: Story = {
  render: () => (
    <div className="bg-gray-900 p-8">
      <FooterBrand />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
