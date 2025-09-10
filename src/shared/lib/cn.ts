import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 클래스명을 조건부로 합치고 Tailwind CSS 클래스 충돌·중복을 제거하는 유틸리티 함수
 *
 * @param inputs - 클래스값들 (문자열, 객체, 배열 등)
 * @returns 병합된 클래스명 문자열
 *
 * @example
 * cn('px-2 py-1', 'bg-blue-500') // 'px-2 py-1 bg-blue-500'
 * cn('px-2 py-1', { 'bg-red-500': isError }) // 조건부 클래스
 * cn('px-2', 'px-4') // 'px-4' (중복 제거)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
