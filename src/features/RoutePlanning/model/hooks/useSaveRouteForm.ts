import { useState, useCallback } from 'react';
import type { RoutePlace, UseSaveRouteFormOptions } from '../types';
import { SAVE_ROUTE_MODAL } from '../messages';

export function useSaveRouteForm(options: UseSaveRouteFormOptions = {}) {
  const { onSave, onClose, onSuccess } = options;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setError(null);
  };

  // handleSubmit 함수가 매 렌더링마다 새로 생성되는 것을 방지하여
  // 불필요한 자식 컴포넌트의 리렌더링을 막기 위해 useCallback을 사용합니다.
  // title, description, onSave, onClose가 변경될 때만 함수가 재생성됩니다.
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
        await onSave?.(title.trim(), description.trim(), places);
        onClose?.();
        resetForm();
        onSuccess?.();
      } catch (err) {
        setError(SAVE_ROUTE_MODAL.VALIDATION.SAVE_FAILED);
        console.error('Failed to save route:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [title, description, onSave, onClose, onSuccess],
  );

  // handleClose 함수가 매 렌더링마다 새로 생성되는 것을 방지하여
  // 불필요한 자식 컴포넌트의 리렌더링을 막기 위해 useCallback을 사용합니다.
  // isLoading이나 onClose가 변경될 때만 함수가 재생성됩니다.
  const handleClose = useCallback(() => {
    if (!isLoading) {
      resetForm();
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
