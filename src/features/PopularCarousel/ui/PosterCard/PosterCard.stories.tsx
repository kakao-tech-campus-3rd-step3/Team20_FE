import type { Meta, StoryObj } from '@storybook/react-vite';
import { PosterCard } from './PosterCard';

const meta = {
  title: 'Features/PopularCarousel/PosterCard',
  component: PosterCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '인기 콘텐츠의 포스터 카드를 보여주는 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: '콘텐츠 고유 ID',
    },
    title: {
      control: 'text',
      description: '콘텐츠 제목',
    },
    year: {
      control: 'number',
      description: '출시 연도',
    },
    spots: {
      control: 'number',
      description: '관련 스팟 수',
    },
  },
} satisfies Meta<typeof PosterCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 포스터 카드',
  args: {
    id: 'squid-game',
    title: 'Squid Game',
    year: 2021,
    spots: 12,
  },
};

export const LongTitle: Story = {
  name: '긴 제목 카드',
  args: {
    id: 'extraordinary-attorney-woo',
    title: 'Extraordinary Attorney Woo',
    year: 2022,
    spots: 8,
  },
};

export const RecentContent: Story = {
  name: '최신 콘텐츠 카드',
  args: {
    id: 'twenty-five-twenty-one',
    title: 'Twenty-Five, Twenty-One',
    year: 2022,
    spots: 11,
  },
};

export const ManySpots: Story = {
  name: '많은 스팟 카드',
  args: {
    id: 'goblin',
    title: 'Guardian: The Lonely and Great God',
    year: 2016,
    spots: 15,
  },
};

export const CardShowcase: Story = {
  name: '카드 쇼케이스',
  args: {
    id: 'showcase',
    title: 'Card Showcase',
    year: 2023,
    spots: 0,
  },
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <PosterCard id="squid-game" title="Squid Game" year={2021} spots={12} />
      <PosterCard id="itaewon-class" title="Itaewon Class" year={2020} spots={9} />
      <PosterCard
        id="twenty-five-twenty-one"
        title="Twenty-Five, Twenty-One"
        year={2022}
        spots={11}
      />
      <PosterCard id="goblin" title="Guardian: The Lonely and Great God" year={2016} spots={15} />
      <PosterCard
        id="extraordinary-attorney-woo"
        title="Extraordinary Attorney Woo"
        year={2022}
        spots={8}
      />
    </div>
  ),
};

export const InteractiveShowcase: Story = {
  name: '인터랙티브 쇼케이스',
  args: {
    id: 'interactive',
    title: 'Interactive Showcase',
    year: 2023,
    spots: 0,
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">호버 효과</h4>
        <div className="flex gap-4">
          <PosterCard id="squid-game" title="Squid Game" year={2021} spots={12} />
          <PosterCard id="itaewon-class" title="Itaewon Class" year={2020} spots={9} />
        </div>
      </div>
    </div>
  ),
};
