import type { Meta, StoryObj } from '@storybook/react-vite';
import { TestButton } from './TestButton';

const meta = {
  title: 'Design System/TestButton',
  component: TestButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'CSS 스타일 시스템을 테스트하기 위한 버튼 컴포넌트입니다. 다양한 브랜드 색상과 시맨틱 색상을 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: '버튼의 색상 변형을 선택합니다.',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기를 선택합니다.',
    },
    children: {
      control: { type: 'text' },
      description: '버튼에 표시될 텍스트입니다.',
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 시 실행될 함수입니다.',
    },
  },
} satisfies Meta<typeof TestButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

// 모든 변형들
export const AllVariants: Story = {
  args: { children: 'Button' },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <TestButton variant="primary">Primary</TestButton>
      <TestButton variant="secondary">Secondary</TestButton>
      <TestButton variant="success">Success</TestButton>
      <TestButton variant="warning">Warning</TestButton>
      <TestButton variant="error">Error</TestButton>
      <TestButton variant="info">Info</TestButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 색상 변형을 보여주는 예시입니다.',
      },
    },
  },
};

// 모든 크기들
export const AllSizes: Story = {
  args: { children: 'Button' },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <TestButton size="small">Small</TestButton>
      <TestButton size="medium">Medium</TestButton>
      <TestButton size="large">Large</TestButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 크기 변형을 보여주는 예시입니다.',
      },
    },
  },
};

// 브랜드 색상들
export const BrandColors: Story = {
  args: { children: 'Button' },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <TestButton variant="primary">Primary Brand</TestButton>
      <TestButton variant="secondary">Secondary Brand</TestButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '브랜드 색상을 사용한 버튼들입니다.',
      },
    },
  },
};

// 시맨틱 색상들
export const SemanticColors: Story = {
  args: { children: 'Button' },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <TestButton variant="success">Success</TestButton>
      <TestButton variant="warning">Warning</TestButton>
      <TestButton variant="error">Error</TestButton>
      <TestButton variant="info">Info</TestButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '시맨틱 색상을 사용한 버튼들입니다.',
      },
    },
  },
};

// 상호작용 테스트
export const Interactive: Story = {
  args: {
    children: 'Click me!',
    onClick: () => alert('Button clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story: '버튼 클릭 시 알림이 표시됩니다.',
      },
    },
  },
};

// 긴 텍스트
export const LongText: Story = {
  args: {
    children: 'This is a very long button text that might wrap',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 있는 버튼의 동작을 확인합니다.',
      },
    },
  },
};
