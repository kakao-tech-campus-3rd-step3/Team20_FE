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

// 핸들러가 없는 상태
export const NoHandlers: Story = {
  args: {},
};

// 모든 핸들러가 있는 상태
export const WithHandlers: Story = {
  args: {
    onLocationViewClick: fn(),
    onMapViewClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          '모든 버튼에 핸들러가 연결된 상태입니다. Actions 패널에서 클릭 이벤트를 확인할 수 있습니다.',
      },
    },
  },
};

// 인터랙티브 테스트
export const Interactive: Story = {
  args: {
    onLocationViewClick: fn(),
    onMapViewClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: '버튼 클릭 시 Actions 패널에 이벤트가 기록됩니다.',
      },
    },
  },
  play: async () => {
    console.log('ContentOverviewActionButtons Interactive Story loaded');
  },
};
