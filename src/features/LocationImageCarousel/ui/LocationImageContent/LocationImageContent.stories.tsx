import type { Meta, StoryObj } from '@storybook/react-vite';
import { LocationImageContent } from './LocationImageContent';

const meta = {
  title: 'Features/LocationImageCarousel/LocationImageContent',
  component: LocationImageContent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LocationImageContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 콘텐츠 (에피소드 포함)
export const Default: Story = {
  args: {
    scene: {
      id: 1,
      title: '오징어 게임 촬영지',
      description:
        '이곳은 넷플릭스 드라마 오징어 게임의 주요 촬영지입니다. 드라마에서 중요한 장면들이 촬영된 곳으로, 많은 관광객들이 찾는 명소가 되었습니다.',
      image: '/src/__mocks__/images/squidgame-spotdetail.jpg',
      episode: '1화',
      timestamp: '00:15:30',
    },
  },
  render: (args) => (
    <div className="relative h-96 bg-gray-900">
      <img src={args.scene.image} alt={args.scene.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <LocationImageContent {...args} />
    </div>
  ),
};

// 에피소드 없는 콘텐츠
export const WithoutEpisode: Story = {
  args: {
    scene: {
      id: 2,
      title: '일반 촬영지',
      description: '에피소드 정보가 없는 일반적인 촬영지입니다.',
      image: '/src/__mocks__/images/squidgame-spotdetail2.jpg',
      episode: '',
      timestamp: '',
    },
  },
  render: (args) => (
    <div className="relative h-96 bg-gray-900">
      <img src={args.scene.image} alt={args.scene.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <LocationImageContent {...args} />
    </div>
  ),
};
