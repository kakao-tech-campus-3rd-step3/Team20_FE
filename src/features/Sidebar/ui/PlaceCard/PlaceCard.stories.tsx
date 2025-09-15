import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlaceCard } from './PlaceCard';
import { MOCK_PLACES } from '@/__mocks__/mockPlace';

const meta = {
  title: 'Features/Sidebar/PlaceCard',
  component: PlaceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PlaceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { ...MOCK_PLACES[0], badgeNumber: 1 },
};

export const OnDarkBackground: Story = {
  render: () => (
    <div className="bg-(--color-background-dark) p-(--spacing-8)">
      <PlaceCard {...MOCK_PLACES[1]} badgeNumber={2} />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
