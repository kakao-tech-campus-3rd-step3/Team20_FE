import { useState, useCallback } from 'react';
import type { RoutePlace, UseSaveRouteFormOptions } from '../types';
import { SAVE_ROUTE_MODAL } from '../messages';

export function useSaveRouteForm(options: UseSaveRouteFormOptions = {}) {
  const { onSave, onClose } = options;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setTitle('');
    setDescription('');
    setError(null);
  }, []);

  const validateForm = useCallback(
    (places: RoutePlace[]) => {
      if (!title.trim()) {
        setError(SAVE_ROUTE_MODAL.VALIDATION.TITLE_REQUIRED);
        return false;
      }

      if (places.length === 0) {
        setError(SAVE_ROUTE_MODAL.VALIDATION.NO_PLACES);
        return false;
      }

      return true;
    },
    [title],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent, places: RoutePlace[]) => {
      e.preventDefault();

      if (!validateForm(places)) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        await onSave?.(title.trim(), description.trim(), places);
        onClose?.();
        resetForm();
      } catch (err) {
        setError(SAVE_ROUTE_MODAL.VALIDATION.SAVE_FAILED);
        console.error('Failed to save route:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [title, description, onSave, onClose, resetForm, validateForm],
  );

  const handleClose = useCallback(() => {
    if (!isLoading) {
      resetForm();
      onClose?.();
    }
  }, [isLoading, onClose, resetForm]);

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
