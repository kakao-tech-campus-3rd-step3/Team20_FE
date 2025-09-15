import type { Meta, StoryObj } from '@storybook/react-vite';

import { ContentOverviewHero } from './ContentOverviewHero';
import type { ContentOverviewHeroProps } from '../../model/types';

// Mock 데이터
const mockContentData: ContentOverviewHeroProps = {
  title: '오징어 게임',
  category: 'K-DRAMA',
  description:
    '생존을 위한 극한의 게임, 전 세계를 사로잡은 한국 드라마. 어린 시절 놀이가 생과 사를 가르는 잔혹한 게임이 되어 돌아왔다.',
  imageUrl: '/src/__mocks__/images/k-drama-squidgame-horizontal.jpg',
  countOfLocations: 12,
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
    title: {
      control: 'text',
      description: '콘텐츠 제목',
    },
    category: {
      control: 'text',
      description: '콘텐츠 카테고리',
    },
    description: {
      control: 'text',
      description: '콘텐츠 설명',
    },
    imageUrl: {
      control: 'text',
      description: '배경 이미지 URL',
    },
    countOfLocations: {
      control: 'number',
      description: '촬영지 개수',
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

// 촬영지 개수가 많은 경우
export const ManyLocations: Story = {
  args: {
    ...mockContentData,
    countOfLocations: 25,
  },
};

// 촬영지 개수가 적은 경우
export const FewLocations: Story = {
  args: {
    ...mockContentData,
    countOfLocations: 3,
  },
};

// 촬영지 개수가 없는 경우
export const NoLocations: Story = {
  args: {
    ...mockContentData,
    countOfLocations: undefined,
  },
};

// 긴 제목 스토리
export const LongTitle: Story = {
  args: {
    ...mockContentData,
    title: '매우 긴 제목이 있는 한국 드라마 시리즈의 이름입니다',
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

// 영화 카테고리 스토리
export const MovieCategory: Story = {
  args: {
    ...mockContentData,
    category: 'MOVIE',
    title: '기생충',
    description: '빈부격차를 다룬 한국 영화의 걸작. 국제적으로 인정받은 봉준호 감독의 작품입니다.',
    countOfLocations: 8,
  },
};

// 예능 카테고리 스토리
export const VarietyCategory: Story = {
  args: {
    ...mockContentData,
    category: 'VARIETY',
    title: '런닝맨',
    description:
      '한국을 대표하는 예능 프로그램. 다양한 게임과 미션을 통해 웃음과 재미를 선사합니다.',
    countOfLocations: 15,
  },
};

// 다크 테마 테스트를 위한 어두운 이미지
export const DarkImage: Story = {
  args: {
    ...mockContentData,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop',
    title: '다크 테마 콘텐츠',
    description: '어두운 배경 이미지를 사용한 콘텐츠입니다.',
  },
};

// 라이트 테마 테스트를 위한 밝은 이미지
export const LightImage: Story = {
  args: {
    ...mockContentData,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-14b1e0d0b0b0?w=1920&h=1080&fit=crop',
    title: '라이트 테마 콘텐츠',
    description: '밝은 배경 이미지를 사용한 콘텐츠입니다.',
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
