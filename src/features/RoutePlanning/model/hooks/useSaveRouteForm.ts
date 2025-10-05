import { useState, useCallback } from 'react';
import type { RoutePlace } from '../types';
import { SAVE_ROUTE_MODAL } from '../messages';

interface UseSaveRouteFormOptions {
  onSave?: (title: string, description: string) => void;
  onClose?: () => void;
}

export function useSaveRouteForm(options: UseSaveRouteFormOptions = {}) {
  const { onSave, onClose } = options;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent, places: RoutePlace[]) => {
      e.preventDefault();

      if (!title.trim()) {
        setError(SAVE_ROUTE_MODAL.VALIDATION.TITLE_REQUIRED);
        return;
      }

      if (places.length === 0) {
        setError(SAVE_ROUTE_MODAL.VALIDATION.NO_PLACES);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 임시 딜레이

        onSave?.(title.trim(), description.trim());
        onClose?.();

        setTitle('');
        setDescription('');
      } catch (err) {
        setError(SAVE_ROUTE_MODAL.VALIDATION.SAVE_FAILED);
        console.error('Failed to save route:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [title, description, onSave, onClose],
  );

  const handleClose = useCallback(() => {
    if (!isLoading) {
      setTitle('');
      setDescription('');
      setError(null);
      onClose?.();
    }
  }, [isLoading, onClose]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setError(null);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return {
    title,
    description,
    isLoading,
    error,
    handleSubmit,
    handleClose,
    handleTitleChange,
    handleDescriptionChange,
  };
}
