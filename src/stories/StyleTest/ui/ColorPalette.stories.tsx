import type { Meta, StoryObj } from '@storybook/react-vite';
import { COLORS } from '../model/constants';

// 색상 카드 컴포넌트
const ColorCard = ({
  color,
}: {
  color: { name: string; value: string; cssVar: string; tailwindClass: string };
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-border-primary overflow-hidden">
    <div
      className={`h-20 w-full ${color.tailwindClass}`}
      style={{ backgroundColor: color.value }}
    />
    <div className="p-4">
      <h3 className="text-body font-semibold text-text-primary mb-2">{color.name}</h3>
      <div className="space-y-1 text-body-small">
        <div className="flex justify-between">
          <span className="text-text-secondary">HEX:</span>
          <code className="bg-background-secondary px-2 py-1 rounded text-text-primary font-mono">
            {color.value}
          </code>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">CSS:</span>
          <code className="bg-background-secondary px-2 py-1 rounded text-text-primary font-mono">
            {color.cssVar}
          </code>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Class:</span>
          <code className="bg-background-secondary px-2 py-1 rounded text-text-primary font-mono">
            {color.tailwindClass}
          </code>
        </div>
      </div>
    </div>
  </div>
);

// 색상 섹션 컴포넌트
const ColorSection = ({ title, colors }: { title: string; colors: typeof COLORS.brand }) => (
  <div className="mb-8">
    <h2 className="text-heading-3 text-text-primary mb-4">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {colors.map((color) => (
        <ColorCard key={color.name} color={color} />
      ))}
    </div>
  </div>
);

const meta = {
  title: 'Design System/Color Palette',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'CSS @theme에서 정의된 색상 시스템입니다. 브랜드 색상, 시맨틱 색상, 그레이스케일 등을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 전체 색상 팔레트
export const AllColors: Story = {
  render: () => (
    <div className="space-y-8">
      {Object.entries(COLORS).map(([categoryName, colors]) => (
        <ColorSection
          key={categoryName}
          title={`${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} 색상`}
          colors={colors}
        />
      ))}
    </div>
  ),
};

// 브랜드 색상만
export const BrandColors: Story = {
  render: () => <ColorSection title="브랜드 색상" colors={COLORS.brand} />,
  parameters: {
    docs: {
      description: {
        story: '브랜드의 주요 색상들입니다.',
      },
    },
  },
};

// 시맨틱 색상만
export const SemanticColors: Story = {
  render: () => <ColorSection title="시맨틱 색상" colors={COLORS.semantic} />,
  parameters: {
    docs: {
      description: {
        story: '의미를 가진 색상들입니다.',
      },
    },
  },
};

// 그레이스케일만
export const GrayScale: Story = {
  render: () => <ColorSection title="그레이스케일" colors={COLORS.gray} />,
  parameters: {
    docs: {
      description: {
        story: '회색 계열 색상들입니다.',
      },
    },
  },
};

// 배경색만
export const BackgroundColors: Story = {
  render: () => <ColorSection title="배경색" colors={COLORS.background} />,
  parameters: {
    docs: {
      description: {
        story: '배경에 사용되는 색상들입니다.',
      },
    },
  },
};

// 텍스트 색상만
export const TextColors: Story = {
  render: () => (
    <div className="space-y-6">
      <ColorSection title="텍스트 색상" colors={COLORS.text} />

      {/* 텍스트 색상 사용 예시 */}
      <div className="bg-white p-6 rounded-lg border border-border-primary">
        <h3 className="text-heading-4 text-text-primary mb-4">텍스트 색상 사용 예시</h3>
        <div className="space-y-2">
          <p className="text-text-primary">Primary 텍스트 - 주요 내용에 사용</p>
          <p className="text-text-secondary">Secondary 텍스트 - 부가 정보에 사용</p>
          <p className="text-text-tertiary">Tertiary 텍스트 - 보조 정보에 사용</p>
          <div className="bg-gray-800 p-4 rounded-lg mt-4">
            <p className="text-text-inverse">Inverse 텍스트 - 어두운 배경에 사용</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '텍스트에 사용되는 색상들과 사용 예시입니다.',
      },
    },
  },
};

// 테두리 색상만
export const BorderColors: Story = {
  render: () => (
    <div className="space-y-6">
      <ColorSection title="테두리 색상" colors={COLORS.border} />

      {/* 테두리 색상 사용 예시 */}
      <div className="space-y-4">
        <h3 className="text-heading-4 text-text-primary">테두리 색상 사용 예시</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border-2 border-border-primary rounded-lg bg-white">
            <span className="text-body-small">Primary Border</span>
          </div>
          <div className="p-4 border-2 border-border-secondary rounded-lg bg-white">
            <span className="text-body-small">Secondary Border</span>
          </div>
          <div className="p-4 border-2 border-border-focus rounded-lg bg-white">
            <span className="text-body-small">Focus Border</span>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '테두리에 사용되는 색상들과 사용 예시입니다.',
      },
    },
  },
};
