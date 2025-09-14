import type { Meta, StoryObj } from '@storybook/react-vite';

import { ContentOverviewInfo } from '@/features/ContentOverviewHero/ui/ContentOverviewInfo';
import type { ContentOverviewInfoProps } from '@/features/ContentOverviewHero/model/types';

const meta = {
  title: 'Features/ContentOverviewHero/ContentOverviewInfo',
  component: ContentOverviewInfo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '콘텐츠 상세 페이지의 정보 섹션입니다. 제목, 카테고리, 설명, 촬영지 개수를 표시합니다.',
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
    countOfLocations: {
      control: 'number',
      description: '촬영지 개수',
    },
  },
} satisfies Meta<typeof ContentOverviewInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock 데이터
const mockInfoData: ContentOverviewInfoProps = {
  title: '오징어 게임',
  category: 'K-DRAMA',
  description:
    '생존을 위한 극한의 게임, 전 세계를 사로잡은 한국 드라마. 어린 시절 놀이가 생과 사를 가르는 잔혹한 게임이 되어 돌아왔다.',
  countOfLocations: 12,
};

// 기본 스토리
export const Default: Story = {
  args: {
    ...mockInfoData,
  },
};

// 촬영지 개수가 많은 경우
export const ManyLocations: Story = {
  args: {
    ...mockInfoData,
    countOfLocations: 25,
  },
};

// 촬영지 개수가 적은 경우
export const FewLocations: Story = {
  args: {
    ...mockInfoData,
    countOfLocations: 3,
  },
};

// 촬영지 개수가 없는 경우
export const NoLocations: Story = {
  args: {
    ...mockInfoData,
    countOfLocations: undefined,
  },
};

// 긴 제목 스토리
export const LongTitle: Story = {
  args: {
    ...mockInfoData,
    title: '매우 긴 제목이 있는 한국 드라마 시리즈의 이름입니다',
  },
};

// 긴 설명 스토리
export const LongDescription: Story = {
  args: {
    ...mockInfoData,
    description:
      '이것은 매우 긴 설명입니다. 콘텐츠에 대한 자세한 정보를 담고 있으며, 사용자들이 이 콘텐츠에 대해 더 잘 이해할 수 있도록 도와줍니다. 여러 줄에 걸쳐 표시되며, 반응형 디자인에 따라 적절히 조정됩니다.',
  },
};

// 영화 카테고리 스토리
export const MovieCategory: Story = {
  args: {
    ...mockInfoData,
    category: 'MOVIE',
    title: '기생충',
    description: '빈부격차를 다룬 한국 영화의 걸작. 국제적으로 인정받은 봉준호 감독의 작품입니다.',
    countOfLocations: 8,
  },
};

// 예능 카테고리 스토리
export const VarietyCategory: Story = {
  args: {
    ...mockInfoData,
    category: 'VARIETY',
    title: '런닝맨',
    description:
      '한국을 대표하는 예능 프로그램. 다양한 게임과 미션을 통해 웃음과 재미를 선사합니다.',
    countOfLocations: 15,
  },
};

// 최소 정보만 있는 경우
export const MinimalInfo: Story = {
  args: {
    title: '최소 정보',
    category: 'CATEGORY',
    description: '최소한의 정보만 포함된 콘텐츠입니다.',
  },
};
