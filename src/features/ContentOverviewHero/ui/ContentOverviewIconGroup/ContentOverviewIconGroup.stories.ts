import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { ContentOverviewIconGroup } from './ContentOverviewIconGroup';

const meta = {
  title: 'Features/ContentOverviewHero/ContentOverviewIconGroup',
  component: ContentOverviewIconGroup,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '콘텐츠 상세 페이지 상단의 아이콘 그룹입니다. 뒤로가기, 공유하기, 좋아요 버튼을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onBackClick: {
      action: 'back clicked',
      description: '뒤로가기 버튼 클릭 핸들러',
    },
    onShareClick: {
      action: 'share clicked',
      description: '공유하기 버튼 클릭 핸들러',
    },
    onLikeClick: {
      action: 'like clicked',
      description: '좋아요 버튼 클릭 핸들러',
    },
    isLiked: {
      control: 'boolean',
      description: '좋아요 상태',
    },
  },
} satisfies Meta<typeof ContentOverviewIconGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onBackClick: fn(),
    onShareClick: fn(),
    onLikeClick: fn(),
    isLiked: false,
  },
};
