import type { Meta, StoryObj } from '@storybook/react-vite';
import { LocationImageCarousel } from './LocationImageCarousel';

const meta = {
  title: 'Features/LocationImageCarousel/LocationImageCarousel',
  component: LocationImageCarousel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LocationImageCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 캐러셀
export const Default: Story = {};
