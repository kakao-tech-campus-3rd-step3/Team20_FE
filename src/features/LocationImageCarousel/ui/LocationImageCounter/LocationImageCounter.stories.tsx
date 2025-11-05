import type { Meta, StoryObj } from '@storybook/react-vite';
import { LocationImageCounter } from './LocationImageCounter';

const meta = {
  title: 'Features/LocationImageCarousel/LocationImageCounter',
  component: LocationImageCounter,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LocationImageCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    current: 1,
    total: 5,
  },
  render: (args) => (
    <div className="relative h-64 bg-gray-900">
      <img
        src="/src/__mocks__/images/squidgame-spotdetail.jpg"
        alt="Sample image"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <LocationImageCounter {...args} />
    </div>
  ),
};
