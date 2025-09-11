/**
 * 스타일 테스트 관련 타입 정의
 */

export interface ColorInfo {
  name: string;
  value: string;
  cssVar: string;
  tailwindClass: string;
}

export interface TypographyInfo {
  name: string;
  description: string;
  className: string;
  sampleText: string;
}

export interface SafeAreaInfo {
  name: string;
  description: string;
  className: string;
}

export interface ZIndexInfo {
  name: string;
  value: string;
  cssVar: string;
  description: string;
}
