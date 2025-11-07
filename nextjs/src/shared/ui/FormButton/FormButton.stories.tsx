import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { FormButton } from './FormButton';

const meta: Meta<typeof FormButton> = {
  title: 'Components/FormButton',
  component: FormButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'disabled'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    isLoading: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormButton>;

export const Primary: Story = {
  args: {
    children: '로그인',
    variant: 'primary',
    size: 'lg',
  },
};

export const Secondary: Story = {
  args: {
    children: '취소',
    variant: 'secondary',
    size: 'md',
  },
};

export const Disabled: Story = {
  args: {
    children: '비활성화',
    variant: 'disabled',
    size: 'sm',
  },
};

export const Loading: Story = {
  args: {
    children: '처리 중...',
    variant: 'primary',
    isLoading: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <FormButton variant="primary" size="lg">
        Primary Large
      </FormButton>
      <FormButton variant="secondary" size="md">
        Secondary Medium
      </FormButton>
      <FormButton variant="disabled" size="sm">
        Disabled Small
      </FormButton>
      <FormButton variant="primary" isLoading>
        Loading State
      </FormButton>
    </div>
  ),
};

const InteractiveRender = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="w-96">
      <FormButton variant="primary" isLoading={isLoading} onClick={handleClick}>
        {isLoading ? '처리 중...' : '클릭해보세요'}
      </FormButton>
    </div>
  );
};

export const Interactive: Story = {
  render: InteractiveRender,
};
