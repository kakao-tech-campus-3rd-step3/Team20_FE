import type { Meta, StoryObj } from '@storybook/react-vite';
import { LocationImageThumbnails } from './LocationImageThumbnails';
import { contentScenes } from '@/__mocks__/contentScenes';

const meta = {
  title: 'Features/LocationImageCarousel/LocationImageThumbnails',
  component: LocationImageThumbnails,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LocationImageThumbnails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    scenes: contentScenes,
    currentIndex: 0,
    onGoToSlide: () => {},
  },
  render: (args) => (
    <div className="bg-gray-900 p-4">
      <p className="text-white text-center mb-4" />
      <LocationImageThumbnails {...args} />
    </div>
  ),
};

export const InteractiveThumbnails: Story = {
  args: {
    scenes: contentScenes,
    currentIndex: 1,
    onGoToSlide: (index: number) => {
      console.log(`Go to slide ${index}`);
    },
  },
  render: (args) => (
    <div className="bg-gray-900 p-4">
      <p className="text-white text-center mb-4">썸네일을 클릭해보세요 (콘솔에서 로그 확인)</p>
      <LocationImageThumbnails {...args} />
    </div>
  ),
};

export const ResponsiveGrid: Story = {
  name: '반응형 그리드',
  args: {
    scenes: contentScenes,
    currentIndex: 0,
    onGoToSlide: () => {},
  },
  render: (args) => (
    <div className="space-y-8 bg-gray-900 p-4">
      <h2 className="text-2xl font-bold text-center text-white">반응형 그리드</h2>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-center text-white">모바일 (2열)</h3>
        <div className="max-w-sm mx-auto">
          <LocationImageThumbnails {...args} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-center text-white">태블릿 (4열)</h3>
        <div className="max-w-2xl mx-auto">
          <LocationImageThumbnails {...args} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-center text-white">데스크톱 (4열)</h3>
        <div className="max-w-4xl mx-auto">
          <LocationImageThumbnails {...args} />
        </div>
      </div>
    </div>
  ),
};
