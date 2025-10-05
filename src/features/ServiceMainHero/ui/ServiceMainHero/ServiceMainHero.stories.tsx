import type { Meta, StoryObj } from '@storybook/react-vite';
import { ServiceMainHero } from 'src/features/ServiceMainHero';
import { API_SCENARIOS } from '../../../../../.storybook/api-decorator';

const meta = {
  title: 'Features/ServiceMainHero',
  component: ServiceMainHero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '서비스 메인 페이지의 히어로 섹션입니다. MSW Mock 데이터를 사용하여 인기 콘텐츠의 첫 번째 이미지를 표시합니다.',
      },
    },

    api: API_SCENARIOS.DEFAULT,
    controls: { disable: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ServiceMainHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '✅ 기본 히어로 섹션',
  parameters: {
    api: API_SCENARIOS.DEFAULT,
  },
};

// TODO 현재는 필요 없어보이나, 추가되어있는걸로 봐서 추후 동작되게 하면 될 것 같아요.

// export const Loading: Story = {
//   name: '⏳ 로딩 상태',
//   parameters: {
//     api: API_SCENARIOS.LOADING,
//   },
// };

// export const Error: Story = {
//   name: '❌ 에러 상태',
//   parameters: {
//     api: API_SCENARIOS.ERROR,
//   },
// };

// export const Empty: Story = {
//   name: '📭 빈 데이터',
//   parameters: {
//     api: API_SCENARIOS.EMPTY,
//   },
// };

// export const HeroShowcase: Story = {
//   name: '🎨 히어로 쇼케이스',
//   parameters: {
//     api: API_SCENARIOS.DEFAULT,
//   },
//   render: () => (
//     <div className="space-y-8">
//       <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//         <p className="text-blue-700 text-sm">
//           🎭 MSW Mock 데이터를 사용하여 인기 콘텐츠의 첫 번째 이미지를 표시합니다
//         </p>
//       </div>
//       <div>
//         <h3 className="text-lg font-semibold mb-4">ServiceMainHero 컴포넌트</h3>
//         <ServiceMainHero />
//       </div>
//     </div>
//   ),
// };

// export const ResponsiveShowcase: Story = {
//   name: '📱 반응형 쇼케이스',
//   parameters: {
//     api: API_SCENARIOS.DEFAULT,
//   },
//   render: () => (
//     <div className="space-y-6">
//       <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
//         <p className="text-green-700 text-sm">
//           📐 다양한 화면 크기에서의 히어로 섹션 반응형 동작을 확인합니다
//         </p>
//       </div>
//       <div>
//         <h4 className="text-sm font-medium mb-2">모바일 크기</h4>
//         <div className="max-w-sm border border-gray-200 p-4 rounded-lg">
//           <ServiceMainHero />
//         </div>
//       </div>
//       <div>
//         <h4 className="text-sm font-medium mb-2">태블릿 크기</h4>
//         <div className="max-w-4xl border border-gray-200 p-4 rounded-lg">
//           <ServiceMainHero />
//         </div>
//       </div>
//       <div>
//         <h4 className="text-sm font-medium mb-2">데스크톱 크기</h4>
//         <div className="max-w-7xl border border-gray-200 p-4 rounded-lg">
//           <ServiceMainHero />
//         </div>
//       </div>
//     </div>
//   ),
// };

// export const FullWidthShowcase: Story = {
//   name: '🖥️ 전체 너비 쇼케이스',
//   parameters: {
//     api: API_SCENARIOS.DEFAULT,
//   },
//   render: () => (
//     <div className="w-full">
//       <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
//         <p className="text-purple-700 text-sm">
//           💻 전체 너비에서의 히어로 섹션 레이아웃을 확인합니다
//         </p>
//       </div>
//       <ServiceMainHero />
//     </div>
//   ),
// };
