import { useEffect } from 'react';
import type { UseModalScrollLockProps } from '../model/types';

export function useModalScrollLock({ isOpen, onClose }: UseModalScrollLockProps) {
  useEffect(() => {
    if (isOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;

      // body에 스크롤 방지 스타일 적용
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      // ESC 키로 모달 닫기
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);

      return () => {
        // 스크롤 위치 복원
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);

        // 이벤트 리스너 제거
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);
}
