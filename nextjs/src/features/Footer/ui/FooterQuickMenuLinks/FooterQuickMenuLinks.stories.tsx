import type { Meta, StoryObj } from '@storybook/nextjs';
import { FooterQuickMenuLinks } from './FooterQuickMenuLinks';

const meta = {
  title: 'Features/Footer/FooterQuickMenuLinks',
  component: FooterQuickMenuLinks,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FooterQuickMenuLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

// 다크 배경에서의 모습
export const Default: Story = {
  render: () => (
    <div className="bg-gray-900 p-8">
      <FooterQuickMenuLinks />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
