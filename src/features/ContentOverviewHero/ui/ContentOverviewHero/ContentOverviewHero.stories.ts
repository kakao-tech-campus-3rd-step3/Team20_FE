import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentOverviewHero } from './ContentOverviewHero';
import type { ContentOverviewHeroProps } from '../../model/types';
import { API_SCENARIOS } from '../../../../../.storybook/api-decorator';

// Mock 데이터 (MSW에서 제공하는 실제 데이터와 일치)
const mockContentData: ContentOverviewHeroProps = {
  contentId: '1', // MSW에서 제공하는 실제 contentId
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
    // MSW Mock 데이터 사용
    api: API_SCENARIOS.DEFAULT,
    controls: { disable: true }, // Controls 비활성화로 circular JSON 오류 방지
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

// 기본 스토리
export const Default: Story = {
  name: '✅ 기본 콘텐츠 히어로',
  args: {
    ...mockContentData,
  },
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
};

// TODO 현재는 필요 없어보이나, 추가되어있는걸로 봐서 추후 동작되게 하면 될 것 같아요.

// // 좋아요 상태 스토리
// export const Liked: Story = {
//   name: '❤️ 좋아요 상태',
//   args: {
//     ...mockContentData,
//     isLiked: true,
//   },
//   parameters: {
//     api: API_SCENARIOS.DEFAULT,
//   },
// };

// // 긴 설명 스토리
// export const LongDescription: Story = {
//   name: '📝 긴 설명 텍스트',
//   args: {
//     ...mockContentData,
//     description:
//       '이것은 매우 긴 설명입니다. 콘텐츠에 대한 자세한 정보를 담고 있으며, 사용자들이 이 콘텐츠에 대해 더 잘 이해할 수 있도록 도와줍니다. 여러 줄에 걸쳐 표시되며, 반응형 디자인에 따라 적절히 조정됩니다. 이 설명은 충분히 길어서 텍스트 오버플로우나 레이아웃 문제를 테스트할 수 있습니다. 추가적으로 더 많은 텍스트를 포함하여 실제 사용 환경에서의 레이아웃을 확인할 수 있습니다.',
//   },
//   parameters: {
//     api: API_SCENARIOS.DEFAULT,
//   },
// };

// // 짧은 설명 스토리
// export const ShortDescription: Story = {
//   name: '📄 짧은 설명',
//   args: {
//     ...mockContentData,
//     description: '간단한 설명입니다.',
//   },
//   parameters: {
//     api: API_SCENARIOS.DEFAULT,
//   },
// };

// // 로딩 상태 스토리
// export const Loading: Story = {
//   name: '⏳ 로딩 상태',
//   args: {
//     ...mockContentData,
//   },
//   parameters: {
//     api: API_SCENARIOS.LOADING,
//   },
// };

// // 에러 상태 스토리
// export const Error: Story = {
//   name: '❌ 에러 상태',
//   args: {
//     ...mockContentData,
//   },
//   parameters: {
//     api: API_SCENARIOS.ERROR,
//   },
// };

// // 모바일 뷰포트 테스트
// export const MobileView: Story = {
//   name: '📱 모바일 뷰',
//   args: {
//     ...mockContentData,
//   },
//   parameters: {
//     api: API_SCENARIOS.DEFAULT,
//     viewport: {
//       defaultViewport: 'mobile1',
//     },
//   },
// };

// // 태블릿 뷰포트 테스트
// export const TabletView: Story = {
//   name: '📱 태블릿 뷰',
//   args: {
//     ...mockContentData,
//   },
//   parameters: {
//     api: API_SCENARIOS.DEFAULT,
//     viewport: {
//       defaultViewport: 'tablet',
//     },
//   },
// };

// // 데스크톱 뷰포트 테스트
// export const DesktopView: Story = {
//   name: '🖥️ 데스크톱 뷰',
//   args: {
//     ...mockContentData,
//   },
//   parameters: {
//     api: API_SCENARIOS.DEFAULT,
//     viewport: {
//       defaultViewport: 'desktop',
//     },
//   },
// };
