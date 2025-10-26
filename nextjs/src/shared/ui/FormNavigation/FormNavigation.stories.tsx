import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormNavigation } from './FormNavigation';

const meta: Meta<typeof FormNavigation> = {
  title: 'Components/FormNavigation',
  component: FormNavigation,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof FormNavigation>;

export const LoginForm: Story = {
  args: {
    leftLink: {
      href: '/forgot-password',
      text: '비밀번호 재설정하기',
    },
    rightText: '계정이 없으신가요?',
    rightLink: {
      href: '/signup',
      text: '회원가입하기',
    },
  },
};

export const SignupForm: Story = {
  args: {
    rightText: '이미 계정이 있으신가요?',
    rightLink: {
      href: '/login',
      text: '로그인하기',
    },
  },
};

export const LeftOnly: Story = {
  args: {
    leftLink: {
      href: '/forgot-password',
      text: '비밀번호 재설정하기',
    },
  },
};

export const RightOnly: Story = {
  args: {
    rightText: '계정이 없으신가요?',
    rightLink: {
      href: '/signup',
      text: '회원가입하기',
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="w-96 space-y-8">
      <div className="p-4 border rounded-lg">
        <h3 className="text-sm font-semibold mb-2">로그인 폼</h3>
        <FormNavigation
          leftLink={{ href: '/forgot-password', text: '비밀번호 재설정하기' }}
          rightText="계정이 없으신가요?"
          rightLink={{ href: '/signup', text: '회원가입하기' }}
        />
      </div>

      <div className="p-4 border rounded-lg">
        <h3 className="text-sm font-semibold mb-2">회원가입 폼</h3>
        <FormNavigation
          rightText="이미 계정이 있으신가요?"
          rightLink={{ href: '/login', text: '로그인하기' }}
        />
      </div>

      <div className="p-4 border rounded-lg">
        <h3 className="text-sm font-semibold mb-2">왼쪽 링크만</h3>
        <FormNavigation leftLink={{ href: '/help', text: '도움말 보기' }} />
      </div>
    </div>
  ),
};
