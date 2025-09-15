import type { Meta, StoryObj } from '@storybook/react-vite';
import { MapContainer } from './MapContainer';

const meta = {
  title: 'Features/Map/MapContainer',
  component: MapContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MapContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 지도 Mock
export const Default: Story = {};
