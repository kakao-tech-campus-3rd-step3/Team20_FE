import { useState, useCallback } from 'react';
import type { RoutePlace } from '../types';

interface UseSaveRouteModalOptions {
  onSaveRoute?: (title: string, description: string, places: RoutePlace[]) => void;
}

export function useSaveRouteModal(options: UseSaveRouteModalOptions = {}) {
  const { onSaveRoute } = options;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // handleSave 함수가 매 렌더링마다 새로 생성되는 것을 방지하여
  // 불필요한 자식 컴포넌트의 리렌더링을 막기 위해 useCallback을 사용합니다.
  // onSaveRoute가 변경될 때만 함수가 재생성됩니다.
  const handleSave = useCallback(
    (title: string, description: string, places: RoutePlace[]) => {
      onSaveRoute?.(title, description, places);
      setIsModalOpen(false);
    },
    [onSaveRoute],
  );

  return {
    isModalOpen,
    openModal,
    closeModal,
    handleSave,
  };
}

