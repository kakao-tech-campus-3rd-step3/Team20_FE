import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfileButton } from './ProfileButton';

const meta = {
  title: 'Features/Header/ProfileButton',
  component: ProfileButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnDarkBackground: Story = {
  render: () => (
    <div className="bg-gray-900 p-8">
      <ProfileButton />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const SizeComparison: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <p className="mb-2 text-sm text-gray-600">Small</p>
        <div className="scale-75">
          <ProfileButton />
        </div>
      </div>
      <div className="text-center">
        <p className="mb-2 text-sm text-gray-600">Default</p>
        <ProfileButton />
      </div>
      <div className="text-center">
        <p className="mb-2 text-sm text-gray-600">Large</p>
        <div className="scale-125">
          <ProfileButton />
        </div>
      </div>
    </div>
  ),
};
