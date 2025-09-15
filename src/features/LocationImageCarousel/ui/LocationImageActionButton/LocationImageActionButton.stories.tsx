import type { Meta, StoryObj } from '@storybook/react-vite';
import { LocationImageActionButton } from './LocationImageActionButton';

const meta = {
  title: 'Features/LocationImageCarousel/LocationImageActionButton',
  component: LocationImageActionButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LocationImageActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 액션 버튼
export const Default: Story = {};

// 다크 배경에서의 모습
export const OnDarkBackground: Story = {
  render: () => (
    <div className="bg-gray-900 p-8">
      <LocationImageActionButton />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
