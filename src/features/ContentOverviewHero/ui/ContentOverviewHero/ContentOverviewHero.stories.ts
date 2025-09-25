import type { Meta, StoryObj } from '@storybook/react-vite';

import { ContentOverviewHero } from './ContentOverviewHero';
import type { ContentOverviewHeroProps } from '../../model/types';

// Mock 데이터
const mockContentData: ContentOverviewHeroProps = {
  contentId: 'mock-content-1',
  description:
    '생존을 위한 극한의 게임, 전 세계를 사로잡은 한국 드라마. 어린 시절 놀이가 생과 사를 가르는 잔혹한 게임이 되어 돌아왔다.',
  isLiked: false,
};

const meta = {
  title: 'Features/ContentOverviewHero',
  component: ContentOverviewHero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '콘텐츠 상세 페이지의 메인 히어로 섹션입니다. 배경 이미지, 제목, 카테고리, 설명, 액션 버튼들을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    contentId: {
      control: 'text',
      description: '콘텐츠 ID (API에서 데이터를 가져오는데 사용)',
    },
    description: {
      control: 'text',
      description: '콘텐츠 설명',
    },
    isLiked: {
      control: 'boolean',
      description: '좋아요 상태',
    },
  },
} satisfies Meta<typeof ContentOverviewHero>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    ...mockContentData,
  },
};

// 좋아요 상태 스토리
export const Liked: Story = {
  args: {
    ...mockContentData,
    isLiked: true,
  },
};

// 다른 콘텐츠 ID로 테스트
export const DifferentContent: Story = {
  args: {
    ...mockContentData,
    contentId: 'mock-content-2',
  },
};

// 긴 설명 스토리
export const LongDescription: Story = {
  args: {
    ...mockContentData,
    description:
      '이것은 매우 긴 설명입니다. 콘텐츠에 대한 자세한 정보를 담고 있으며, 사용자들이 이 콘텐츠에 대해 더 잘 이해할 수 있도록 도와줍니다. 여러 줄에 걸쳐 표시되며, 반응형 디자인에 따라 적절히 조정됩니다. 이 설명은 충분히 길어서 텍스트 오버플로우나 레이아웃 문제를 테스트할 수 있습니다.',
  },
};

// 짧은 설명 스토리
export const ShortDescription: Story = {
  args: {
    ...mockContentData,
    description: '간단한 설명입니다.',
  },
};

// 설명 없음 스토리
export const NoDescription: Story = {
  args: {
    ...mockContentData,
    description: undefined,
  },
};

// 모바일 뷰포트 테스트
export const MobileView: Story = {
  args: {
    ...mockContentData,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// 태블릿 뷰포트 테스트
export const TabletView: Story = {
  args: {
    ...mockContentData,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

// 데스크톱 뷰포트 테스트
export const DesktopView: Story = {
  args: {
    ...mockContentData,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

// 액션 테스트를 위한 인터랙티브 스토리
export const Interactive: Story = {
  args: {
    ...mockContentData,
  },
  parameters: {
    docs: {
      description: {
        story: '이 스토리에서는 모든 버튼 클릭 이벤트가 Actions 패널에 기록됩니다.',
      },
    },
  },
  play: async () => {
    // 인터랙션 테스트를 위한 플레이 함수
    console.log('ContentOverviewHero Interactive Story loaded');
  },
};
