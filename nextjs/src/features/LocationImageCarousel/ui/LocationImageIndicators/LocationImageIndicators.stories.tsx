import type { Meta, StoryObj } from '@storybook/nextjs';
import { LocationImageIndicators } from './LocationImageIndicators';

const meta = {
  title: 'Features/LocationImageCarousel/LocationImageIndicators',
  component: LocationImageIndicators,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LocationImageIndicators>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 인디케이터 (5개)
export const Default: Story = {
  args: {
    total: 5,
    currentIndex: 0,
    onGoToSlide: () => {},
  },
};

// 첫 번째 인디케이터 활성화
export const FirstActive: Story = {
  args: {
    total: 5,
    currentIndex: 0,
    onGoToSlide: () => {},
  },
};

// 매우 많은 인디케이터
export const VeryManyIndicators: Story = {
  args: {
    total: 20,
    currentIndex: 9,
    onGoToSlide: () => {},
  },
};

// 인터랙티브 인디케이터
export const InteractiveIndicators: Story = {
  args: {
    total: 8,
    currentIndex: 2,
    onGoToSlide: (index: number) => {
      console.log(`Go to slide ${index}`);
    },
  },
  render: (args) => (
    <div className="bg-gray-900 p-8">
      <p className="text-white text-center mb-4">인디케이터를 클릭해보세요 (콘솔에서 로그 확인)</p>
      <LocationImageIndicators {...args} />
    </div>
  ),
};

// 다크 배경에서의 모습
export const OnDarkBackground: Story = {
  args: {
    total: 6,
    currentIndex: 2,
    onGoToSlide: () => {},
  },
  render: (args) => (
    <div className="bg-gray-900 p-8">
      <LocationImageIndicators {...args} />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
