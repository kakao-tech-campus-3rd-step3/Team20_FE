import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentOverviewHero } from './ContentOverviewHero';
import type { ContentOverviewHeroProps } from '../../model/types';
import { API_SCENARIOS } from '../../../../../.storybook/api-decorator';

const mockContentData: ContentOverviewHeroProps = {
  contentId: '1',
  description:
    '평범한 대학생인 "이원준"이 은퇴한 전직 아이돌 "이두나"가 사는 셰어하우스에 살게 되면서 벌어지는 로맨스 이야기',
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
          '콘텐츠 상세 페이지의 메인 히어로 섹션입니다. MSW Mock 데이터를 사용하여 배경 이미지, 제목, 카테고리, 설명, 액션 버튼들을 표시합니다.',
      },
    },
    api: API_SCENARIOS.DEFAULT,
    controls: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    contentId: {
      control: 'text',
      description: '콘텐츠 ID (MSW API에서 데이터를 가져오는데 사용)',
    },
    description: {
      control: 'text',
      description: '콘텐츠 설명 (옵션)',
    },
    isLiked: {
      control: 'boolean',
      description: '좋아요 상태',
    },
  },
} satisfies Meta<typeof ContentOverviewHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '✅ 기본 콘텐츠 히어로',
  args: {
    ...mockContentData,
  },
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
};
