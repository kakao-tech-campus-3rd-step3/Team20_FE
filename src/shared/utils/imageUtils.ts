/**
 * 이미지 URL 배열에서 첫 번째 이미지를 추출하는 유틸 함수
 * @param imageUrl - 이미지 URL 배열 또는 단일 이미지 URL
 * @returns 첫 번째 이미지 URL 또는 undefined
 */
export function getFirstImage(imageUrl?: string[] | string): string | undefined {
  if (!imageUrl) return undefined;
  return Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;
}
