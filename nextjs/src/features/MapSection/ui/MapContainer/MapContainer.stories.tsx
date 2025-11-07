import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import { MapContainer } from './MapContainer';

const sbContainerRef: React.RefObject<HTMLDivElement | null> = { current: null };

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

export const Default: Story = {
  args: {
    containerRef: sbContainerRef,
    className: 'h-[600px]',
    ariaLabel: '스토리북 카카오 지도',
  },
};
