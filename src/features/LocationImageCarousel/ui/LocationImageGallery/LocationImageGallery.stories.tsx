import type { Meta, StoryObj } from '@storybook/react-vite';
import { LocationImageGallery } from './LocationImageGallery';
import { contentScenes } from '@/__mocks__/contentScenes';

const meta = {
  title: 'Features/LocationImageCarousel/LocationImageGallery',
  component: LocationImageGallery,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LocationImageGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentIndex: 0,
    scenes: contentScenes,
    onPrev: () => {},
    onNext: () => {},
    onGoToSlide: () => {},
  },
};

export const SecondSlide: Story = {
  args: {
    currentIndex: 1,
    scenes: contentScenes,
    onPrev: () => {},
    onNext: () => {},
    onGoToSlide: () => {},
  },
};

export const InteractiveGallery: Story = {
  args: {
    currentIndex: 0,
    scenes: contentScenes,
    onPrev: () => {
      console.log('Previous slide clicked');
    },
    onNext: () => {
      console.log('Next slide clicked');
    },
    onGoToSlide: (index: number) => {
      console.log(`Go to slide ${index}`);
    },
  },
  render: (args) => (
    <div className="bg-gray-900 p-4">
      <p className="text-white text-center mb-4">
        네비게이션 버튼과 인디케이터를 클릭해보세요 (콘솔에서 로그 확인)
      </p>
      <LocationImageGallery {...args} />
    </div>
  ),
};
