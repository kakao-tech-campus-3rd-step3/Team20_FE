import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    error: {
      control: { type: 'text' },
    },
    touched: {
      control: { type: 'boolean' },
    },
    showError: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
  },
};

export const WithError: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    error: '올바른 이메일 형식을 입력해주세요',
    touched: true,
    showError: true,
  },
};

export const Password: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
  },
};

export const WithoutLabel: Story = {
  args: {
    placeholder: '라벨 없는 입력 필드',
  },
};

const InteractiveRender = () => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const hasError = value.length > 0 && value.length < 3;

  return (
    <div className="w-96">
      <Input
        label="닉네임"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder="닉네임을 입력하세요 (3자 이상)"
        error={hasError ? '닉네임은 3자 이상이어야 합니다' : undefined}
        touched={touched}
        showError={hasError && touched}
      />
    </div>
  );
};

export const Interactive: Story = {
  render: InteractiveRender,
};
