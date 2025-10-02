import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormTitle } from './FormTitle';

const meta: Meta<typeof FormTitle> = {
  title: 'Components/FormTitle',
  component: FormTitle,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormTitle>;

export const Default: Story = {
  args: {
    children: '로그인',
  },
};

export const Signup: Story = {
  args: {
    children: '회원가입',
  },
};

export const CustomStyle: Story = {
  args: {
    children: '커스텀 스타일',
    className: 'text-2xl text-blue-600 font-extrabold',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <FormTitle>기본 제목</FormTitle>
      <FormTitle className="text-2xl text-purple-600">보라색 제목</FormTitle>
      <FormTitle className="text-4xl text-green-600 font-extrabold">큰 초록색 제목</FormTitle>
      <FormTitle className="text-xl text-gray-500">작은 회색 제목</FormTitle>
    </div>
  ),
};
