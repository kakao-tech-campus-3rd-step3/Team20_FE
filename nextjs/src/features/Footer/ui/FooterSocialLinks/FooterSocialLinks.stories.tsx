import type { Meta, StoryObj } from '@storybook/nextjs';
import { FooterSocialLinks } from './FooterSocialLinks';

const meta = {
  title: 'Features/Footer/FooterSocialLinks',
  component: FooterSocialLinks,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FooterSocialLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

// 다크 배경에서의 모습
export const Default: Story = {
  render: () => (
    <div className="bg-gray-900 p-8">
      <FooterSocialLinks />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
