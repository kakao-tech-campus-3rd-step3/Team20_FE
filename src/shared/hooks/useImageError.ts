import { useState, useEffect } from 'react';
import { getFirstImage } from '../utils/imageUtils';

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
