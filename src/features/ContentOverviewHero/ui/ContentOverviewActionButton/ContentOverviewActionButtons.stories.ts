import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { ContentOverviewActionButtons } from './ContentOverviewActionButtons';

const meta = {
  title: 'Features/ContentOverviewHero/ContentOverviewActionButtons',
  component: ContentOverviewActionButtons,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '콘텐츠 상세 페이지 하단의 액션 버튼들입니다. 촬영지 보기와 지도 보기 버튼을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onLocationViewClick: {
      action: 'location view clicked',
      description: '촬영지 보기 버튼 클릭 핸들러',
    },
    onMapViewClick: {
      action: 'map view clicked',
      description: '지도 보기 버튼 클릭 핸들러',
    },
  },
} satisfies Meta<typeof ContentOverviewActionButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    onLocationViewClick: fn(),
    onMapViewClick: fn(),
  },
};
