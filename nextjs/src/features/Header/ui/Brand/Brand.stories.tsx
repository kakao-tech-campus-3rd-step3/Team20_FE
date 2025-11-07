import type { Meta, StoryObj } from '@storybook/nextjs';
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

// 기본 브랜드 컴포넌트
export const Default: Story = {};

// 다크 배경에서의 모습
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
