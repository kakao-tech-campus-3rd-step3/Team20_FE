import type { Meta, StoryObj } from '@storybook/react-vite';
import { TYPOGRAPHY } from '../model/constants';

// 타이포그래피 카드 컴포넌트
const TypographyCard = ({
  typo,
}: {
  typo: { name: string; description: string; className: string; sampleText: string };
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-border-primary p-6">
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <div className="md:w-1/3">
        <h3 className="text-body font-semibold text-text-primary mb-1">{typo.name}</h3>
        <p className="text-body-small text-text-secondary mb-2">{typo.description}</p>
        <code className="bg-background-secondary px-2 py-1 rounded text-body-small text-text-primary font-mono">
          {typo.className}
        </code>
      </div>
      <div className="md:w-2/3">
        <div className={`${typo.className} text-text-primary`}>{typo.sampleText}</div>
      </div>
    </div>
  </div>
);

const meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'CSS @utility에서 정의된 타이포그래피 시스템입니다. 제목, 본문, 캡션 등 다양한 텍스트 스타일을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 전체 타이포그래피
export const AllTypography: Story = {
  render: () => (
    <div className="space-y-6">
      {TYPOGRAPHY.map((typo) => (
        <TypographyCard key={typo.name} typo={typo} />
      ))}
    </div>
  ),
};

// 제목 스타일들만
export const Headings: Story = {
  render: () => (
    <div className="space-y-6">
      {TYPOGRAPHY.filter((typo) => typo.name.includes('Heading')).map((typo) => (
        <TypographyCard key={typo.name} typo={typo} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '제목에 사용되는 타이포그래피 스타일들입니다.',
      },
    },
  },
};

// 본문 스타일들만
export const BodyText: Story = {
  render: () => (
    <div className="space-y-6">
      {TYPOGRAPHY.filter((typo) => typo.name.includes('Body')).map((typo) => (
        <TypographyCard key={typo.name} typo={typo} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '본문에 사용되는 타이포그래피 스타일들입니다.',
      },
    },
  },
};

// 캡션 및 기타 스타일들
export const OtherStyles: Story = {
  render: () => (
    <div className="space-y-6">
      {TYPOGRAPHY.filter(
        (typo) =>
          typo.name.includes('Caption') ||
          typo.name.includes('Button') ||
          typo.name.includes('Link'),
      ).map((typo) => (
        <TypographyCard key={typo.name} typo={typo} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '캡션, 버튼, 링크 등에 사용되는 타이포그래피 스타일들입니다.',
      },
    },
  },
};

// 타이포그래피 계층 구조 시각화
export const Hierarchy: Story = {
  render: () => (
    <div className="bg-white p-8 rounded-lg border border-border-primary">
      <div className="space-y-4">
        <h1 className="text-heading-1 text-text-primary">Heading 1 - 최상위 제목</h1>
        <h2 className="text-heading-2 text-text-primary">Heading 2 - 섹션 제목</h2>
        <h3 className="text-heading-3 text-text-primary">Heading 3 - 하위 섹션 제목</h3>
        <h4 className="text-heading-4 text-text-primary">Heading 4 - 소제목</h4>
        <h5 className="text-heading-5 text-text-primary">Heading 5 - 작은 소제목</h5>
        <h6 className="text-heading-6 text-text-primary">Heading 6 - 최소 제목</h6>

        <div className="pt-4 border-t border-border-primary">
          <p className="text-body-large text-text-primary mb-3">
            Body Large - 큰 본문 텍스트입니다. 중요한 내용이나 인트로 텍스트에 사용됩니다.
          </p>
          <p className="text-body text-text-primary mb-3">
            Body - 일반적인 본문 텍스트입니다. 대부분의 내용에 사용되는 기본 텍스트 스타일입니다.
          </p>
          <p className="text-body-small text-text-secondary mb-3">
            Body Small - 작은 본문 텍스트입니다. 부가 정보나 설명 텍스트에 사용됩니다.
          </p>
          <p className="text-caption text-text-tertiary mb-2">
            Caption - 캡션 텍스트입니다. 이미지 설명이나 메타 정보에 사용됩니다.
          </p>
          <p className="text-caption-bold text-text-tertiary">
            Caption Bold - 강조된 캡션 텍스트입니다.
          </p>
        </div>

        <div className="pt-4 border-t border-border-primary flex gap-4">
          <span className="text-button bg-brand-primary text-white px-4 py-2 rounded">
            Button Text
          </span>
          <span className="text-button-large bg-brand-secondary text-white px-6 py-3 rounded">
            Button Large
          </span>
          <a href="#" className="text-link text-brand-primary">
            Link Text
          </a>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '타이포그래피 계층 구조를 시각화한 예시입니다.',
      },
    },
  },
};

// 다양한 색상과 조합
export const WithColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-border-primary">
        <h3 className="text-heading-3 text-text-primary mb-4">기본 색상 조합</h3>
        <p className="text-body text-text-primary mb-2">Primary 텍스트</p>
        <p className="text-body text-text-secondary mb-2">Secondary 텍스트</p>
        <p className="text-body text-text-tertiary">Tertiary 텍스트</p>
      </div>

      <div className="bg-background-dark p-6 rounded-lg">
        <h3 className="text-heading-3 text-text-inverse mb-4">다크 배경 조합</h3>
        <p className="text-body text-text-inverse mb-2">Inverse 텍스트</p>
        <p className="text-body-small text-gray-300">밝은 회색 텍스트</p>
      </div>

      <div className="bg-brand-primary p-6 rounded-lg">
        <h3 className="text-heading-3 text-white mb-4">브랜드 색상 배경</h3>
        <p className="text-body text-white mb-2">화이트 텍스트</p>
        <p className="text-body-small text-brand-primary bg-white px-3 py-1 rounded inline-block">
          브랜드 색상 텍스트
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 배경색과 텍스트 색상의 조합 예시입니다.',
      },
    },
  },
};
