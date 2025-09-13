import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from 'src/features/ServiceMainHero/ui/Button';

const meta = {
  title: 'Features/ServiceMainHero/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '서비스 메인 히어로에서 사용되는 버튼 컴포넌트입니다. primary와 secondary 두 가지 변형을 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: '버튼 클릭 시 이동할 경로',
    },
    children: {
      control: 'text',
      description: '버튼 내부에 표시될 텍스트',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: '버튼의 스타일 변형',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: 'Primary 버튼',
  args: {
    href: '/map',
    children: '여행시작하기',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  name: 'Secondary 버튼',
  args: {
    href: '/map',
    children: '지도열기',
    variant: 'secondary',
  },
};

export const ButtonVariants: Story = {
  name: '버튼 변형 쇼케이스',
  args: {
    href: '/map',
    children: '버튼 텍스트',
    variant: 'primary',
  },
  render: (args) => (
    <div className="flex gap-4">
      <Button {...args} variant="primary">
        여행시작하기
      </Button>
      <Button {...args} variant="secondary">
        지도열기
      </Button>
    </div>
  ),
};

export const InteractiveShowcase: Story = {
  name: '인터랙티브 쇼케이스',
  args: {
    href: '/map',
    children: '호버 효과 테스트',
    variant: 'primary',
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">호버 효과</h4>
        <div className="flex gap-4">
          <Button href="/map" variant="primary">
            Primary 버튼
          </Button>
          <Button href="/map" variant="secondary">
            Secondary 버튼
          </Button>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">긴 텍스트 버튼</h4>
        <div className="flex gap-4">
          <Button href="/map" variant="primary">
            긴 텍스트가 들어간 Primary 버튼 예시
          </Button>
          <Button href="/map" variant="secondary">
            긴 텍스트가 들어간 Secondary 버튼 예시
          </Button>
        </div>
      </div>
    </div>
  ),
};

export const AccessibilityShowcase: Story = {
  name: '접근성 쇼케이스',
  args: {
    href: '/map',
    children: '접근성 테스트',
    variant: 'primary',
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">키보드 포커스</h4>
        <div className="flex gap-4">
          <Button href="/map" variant="primary">
            Tab으로 포커스 가능
          </Button>
          <Button href="/map" variant="secondary">
            Enter로 클릭 가능
          </Button>
        </div>
      </div>
    </div>
  ),
};
