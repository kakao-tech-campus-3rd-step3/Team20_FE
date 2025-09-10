import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    asChild: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼 (브랜드 색상)
export const Default: Story = {
  args: {
    children: '기본 버튼',
  },
};

// 모든 variant 예시
export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'Primary 버튼',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary 버튼',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive 버튼',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline 버튼',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost 버튼',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link 버튼',
  },
};

// 크기별 예시
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small 버튼',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large 버튼',
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '🔥',
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    disabled: true,
    children: '비활성화 버튼',
  },
};

// 브랜드 색상 쇼케이스
export const BrandShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button variant="default">Primary (브랜드)</Button>
      <Button variant="secondary">Secondary (브랜드)</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
