import { useState, useCallback } from 'react';
import type { RoutePlace } from '../types';

interface UseSaveRouteModalOptions {
  onSaveRoute?: (title: string, description: string, places: RoutePlace[]) => void;
}

export function useSaveRouteModal(options: UseSaveRouteModalOptions = {}) {
  const { onSaveRoute } = options;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSave = useCallback(
    (title: string, description: string, places: RoutePlace[]) => {
      onSaveRoute?.(title, description, places);
      closeModal();
    },
    [onSaveRoute, closeModal],
  );

  return {
    isModalOpen,
    openModal,
    closeModal,
    handleSave,
  };
}
