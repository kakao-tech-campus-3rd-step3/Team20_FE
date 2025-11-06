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
