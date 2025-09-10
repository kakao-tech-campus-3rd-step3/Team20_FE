import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';
import { Sparkles, MapPin, Heart } from 'lucide-react';

const meta = {
  title: 'Shared/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['soft', 'gradient', 'outline', 'ghost'],
    },
    shape: {
      control: 'select',
      options: ['pill', 'circle'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    active: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 아이콘 버튼
export const Default: Story = {
  args: {
    Icon: Sparkles,
    'aria-label': '기본 아이콘 버튼',
  },
};

// 텍스트와 함께
export const WithText: Story = {
  args: {
    Icon: Heart,
    children: '좋아요',
    'aria-label': '좋아요 버튼',
  },
};

// 모든 variant 쇼케이스
export const AllVariants: Story = {
  args: {
    Icon: Heart,
    'aria-label': 'All Variants',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <IconButton Icon={Heart} variant="soft" aria-label="Soft" />
      <IconButton Icon={Sparkles} variant="gradient" aria-label="Gradient" />
      <IconButton Icon={MapPin} variant="outline" aria-label="Outline" />
      <IconButton Icon={Heart} variant="ghost" aria-label="Ghost" />
    </div>
  ),
};
