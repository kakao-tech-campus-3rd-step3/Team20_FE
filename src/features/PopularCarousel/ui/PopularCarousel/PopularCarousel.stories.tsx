import type { Meta, StoryObj } from '@storybook/react-vite';
import { PopularCarousel } from 'src/features/PopularCarousel';
import { API_SCENARIOS } from '../../../../../.storybook/api-decorator';

const meta = {
  title: 'Features/PopularCarousel',
  component: PopularCarousel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '인기 콘텐츠를 가로 스크롤 캐러셀로 보여주는 컴포넌트입니다. MSW Mock 데이터를 사용합니다.',
      },
    },
    // MSW Mock 데이터 사용
    api: API_SCENARIOS.DEFAULT,
    controls: { disable: true }, // Controls 비활성화로 circular JSON 오류 방지
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PopularCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '✅ 기본 인기 캐러셀',
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
};

export const Loading: Story = {
  name: '⏳ 로딩 상태',
  parameters: {
    api: API_SCENARIOS.LOADING,
  },
};

export const Error: Story = {
  name: '❌ 에러 상태',
  parameters: {
    api: API_SCENARIOS.ERROR,
  },
};

export const Empty: Story = {
  name: '📭 빈 데이터',
  parameters: {
    api: API_SCENARIOS.EMPTY,
  },
};

export const CarouselShowcase: Story = {
  name: '🎨 캐러셀 쇼케이스',
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
  render: () => (
    <div className="space-y-8">
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-700 text-sm">
          🎭 MSW Mock 데이터를 사용하여 인기 콘텐츠를 표시합니다
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">PopularCarousel 컴포넌트</h3>
        <PopularCarousel />
      </div>
    </div>
  ),
};

export const ResponsiveShowcase: Story = {
  name: '📱 반응형 쇼케이스',
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
  render: () => (
    <div className="space-y-6">
      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-700 text-sm">
          📐 다양한 화면 크기에서의 캐러셀 반응형 동작을 확인합니다
        </p>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">모바일 크기</h4>
        <div className="max-w-sm border border-gray-200 p-4 rounded-lg">
          <PopularCarousel />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">태블릿 크기</h4>
        <div className="max-w-2xl border border-gray-200 p-4 rounded-lg">
          <PopularCarousel />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">데스크톱 크기</h4>
        <div className="max-w-6xl border border-gray-200 p-4 rounded-lg">
          <PopularCarousel />
        </div>
      </div>
    </div>
  ),
};
