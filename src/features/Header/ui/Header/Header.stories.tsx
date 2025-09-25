import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';

const meta = {
  title: 'Features/Header/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: 'select',
      options: ['home', 'map'],
    },
  },
  decorators: [
    (Story) => (
      <div className="h-screen overflow-y-auto bg-gray-50">
        <Story />
        <div className="p-8 pb-24">
          <h2 className="text-2xl font-bold mb-4">페이지 콘텐츠</h2>
          <p className="text-gray-600">
            헤더의 반응형/스티키 동작을 확인하기 위한 샘플 콘텐츠입니다.
          </p>
          <div className="mt-8 space-y-4">
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold">섹션 {i + 1}</h3>
                <p className="text-gray-600">
                  이 섹션은 헤더의 sticky 동작을 테스트하기 위한 콘텐츠입니다.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { active: 'home' } };
export const HomeActive: Story = { args: { active: 'home' } };
export const MapActive: Story = { args: { active: 'map' } };
