import { useState, useEffect } from 'react';
import { getFirstImage } from '../utils/imageUtils';

/**
 * 이미지 로드 에러를 관리하는 훅
 * @param imageUrl - 이미지 URL 배열 또는 단일 이미지 URL
 * @param resetOnChange - 이미지 URL이 변경될 때 에러 상태를 리셋할지 여부
 * @returns 이미지 에러 상태와 에러 핸들러
 */
export function useImageError(
  imageUrl?: string[] | string,
  resetOnChange = true,
): [boolean, () => void, string | undefined] {
  const [imageError, setImageError] = useState(false);
  const firstImage = getFirstImage(imageUrl);

  useEffect(() => {
    if (resetOnChange) {
      setImageError(false);
    }
  }, [firstImage, resetOnChange]);

  const handleError = () => {
    setImageError(true);
  };

  return [imageError, handleError, firstImage];
}
