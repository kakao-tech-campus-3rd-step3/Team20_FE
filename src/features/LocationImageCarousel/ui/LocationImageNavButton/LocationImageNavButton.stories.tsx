import type { Meta, StoryObj } from '@storybook/react-vite';
import { LocationImageNavButton } from './LocationImageNavButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const meta = {
  title: 'Features/LocationImageCarousel/LocationImageNavButton',
  component: LocationImageNavButton,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LocationImageNavButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 왼쪽 네비게이션 버튼
export const LeftButton: Story = {
  args: {
    onClick: () => {},
    icon: ChevronLeft,
    position: 'left',
  },
  render: (args) => (
    <div className="relative h-64 bg-gray-900">
      <img 
        src="/src/__mocks__/images/squidgame-spotdetail.jpg" 
        alt="Sample image"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <LocationImageNavButton {...args} />
    </div>
  ),
};

// 오른쪽 네비게이션 버튼
export const RightButton: Story = {
  args: {
    onClick: () => {},
    icon: ChevronRight,
    position: 'right',
  },
  render: (args) => (
    <div className="relative h-64 bg-gray-900">
      <img 
        src="/src/__mocks__/images/squidgame-spotdetail2.jpg" 
        alt="Sample image"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <LocationImageNavButton {...args} />
    </div>
  ),
};

// 양쪽 네비게이션 버튼
export const BothButtons: Story = {
  render: () => (
    <div className="relative h-64 bg-gray-900">
      <img 
        src="/src/__mocks__/images/squidgame-spotdetail3.png" 
        alt="Sample image"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <LocationImageNavButton onClick={() => {}} icon={ChevronLeft} position="left" />
      <LocationImageNavButton onClick={() => {}} icon={ChevronRight} position="right" />
    </div>
  ),
};

// 인터랙티브 버튼
export const InteractiveButtons: Story = {
  render: () => (
    <div className="relative h-64 bg-gray-900">
      <img 
        src="/src/__mocks__/images/squidgame-spotdetail4.png" 
        alt="Sample image"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <LocationImageNavButton 
        onClick={() => console.log('Previous clicked')} 
        icon={ChevronLeft} 
        position="left" 
      />
      <LocationImageNavButton 
        onClick={() => console.log('Next clicked')} 
        icon={ChevronRight} 
        position="right" 
      />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
        버튼을 클릭해보세요 (콘솔에서 로그 확인)
      </div>
    </div>
  ),
};
