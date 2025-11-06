import type { Meta, StoryObj } from '@storybook/react-vite';
import { LocationImageHeader } from './LocationImageHeader';

const meta = {
  title: 'Features/LocationImageCarousel/LocationImageHeader',
  component: LocationImageHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LocationImageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="bg-gray-900 py-16">
      <LocationImageHeader />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const ResponsiveShowcase: Story = {
  name: '반응형 쇼케이스',
  render: () => (
    <div className="space-y-8 bg-gray-900 py-8">
      <h2 className="text-2xl font-bold text-white text-center">반응형 헤더</h2>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-center text-white">모바일</h3>
        <div className="max-w-sm mx-auto border-2 border-gray-600 rounded-lg overflow-hidden">
          <div className="bg-gray-900 py-8">
            <LocationImageHeader />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-center text-white">태블릿</h3>
        <div className="max-w-2xl mx-auto border-2 border-gray-600 rounded-lg overflow-hidden">
          <div className="bg-gray-900 py-12">
            <LocationImageHeader />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-center text-white">데스크톱</h3>
        <div className="max-w-4xl mx-auto border-2 border-gray-600 rounded-lg overflow-hidden">
          <div className="bg-gray-900 py-16">
            <LocationImageHeader />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
