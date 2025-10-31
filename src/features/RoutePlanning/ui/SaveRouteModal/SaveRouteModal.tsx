import { X } from 'lucide-react';
import type { SaveRouteModalProps } from '../../model/types';
import { useSaveRouteForm } from '../../model/hooks/useSaveRouteForm';
import { SAVE_ROUTE_MODAL } from '../../model/messages';

export function SaveRouteModal({
  isOpen,
  onClose,
  places,
  onSave,
  onSuccess,
  isUpdating = false,
}: SaveRouteModalProps) {
  const {
    title,
    description,
    isLoading,
    error,
    handleSubmit,
    handleClose,
    handleTitleChange,
    handleDescriptionChange,
  } = useSaveRouteForm({
    onSave: (title, description) => onSave?.(title, description, places),
    onClose,
    onSuccess,
  });

  if (!isOpen) return null;

  const modalTitle = isUpdating ? SAVE_ROUTE_MODAL.UPDATE_TITLE : SAVE_ROUTE_MODAL.TITLE;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md mx-4 bg-(--color-background-primary) rounded-xl shadow-(--shadow-modal)">
        <div className="flex items-center justify-between p-(--spacing-6) border-b border-(--color-border-primary)">
          <h2 className="text-heading-5 text-(--color-text-primary)">{modalTitle}</h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="p-(--spacing-1) text-(--color-text-tertiary) hover:text-(--color-text-primary) disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={(e) => handleSubmit(e, places)} className="p-(--spacing-6)">
          <div className="space-y-(--spacing-4)">
            <div>
              <label
                htmlFor="title"
                className="block text-body-small font-medium text-(--color-text-primary) mb-(--spacing-2)"
              >
                {SAVE_ROUTE_MODAL.FORM_LABELS.TITLE}
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder={SAVE_ROUTE_MODAL.PLACEHOLDERS.TITLE}
                disabled={isLoading}
                className="w-full px-(--spacing-3) py-(--spacing-2) border border-(--color-border-primary) rounded-lg bg-(--color-background-primary) text-body text-(--color-text-primary) placeholder:text-(--color-text-tertiary) focus:outline-none focus:ring-2 focus:ring-(--color-border-focus) focus:border-transparent disabled:opacity-50"
                maxLength={SAVE_ROUTE_MODAL.LIMITS.TITLE_MAX_LENGTH}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-body-small font-medium text-(--color-text-primary) mb-(--spacing-2)"
              >
                {SAVE_ROUTE_MODAL.FORM_LABELS.DESCRIPTION}
              </label>
              <textarea
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder={SAVE_ROUTE_MODAL.PLACEHOLDERS.DESCRIPTION}
                disabled={isLoading}
                rows={3}
                className="w-full px-(--spacing-3) py-(--spacing-2) border border-(--color-border-primary) rounded-lg bg-(--color-background-primary) text-body text-(--color-text-primary) placeholder:text-(--color-text-tertiary) focus:outline-none focus:ring-2 focus:ring-(--color-border-focus) focus:border-transparent disabled:opacity-50 resize-none"
                maxLength={SAVE_ROUTE_MODAL.LIMITS.DESCRIPTION_MAX_LENGTH}
              />
            </div>

            <div className="text-caption text-(--color-text-secondary)">
              <p>
                {isUpdating
                  ? SAVE_ROUTE_MODAL.MESSAGES.UPDATE_PLACES_COUNT(places.length)
                  : SAVE_ROUTE_MODAL.MESSAGES.PLACES_COUNT(places.length)}
              </p>
            </div>

            {error && (
              <div className="p-(--spacing-3) bg-(--color-semantic-error)/10 border border-(--color-semantic-error)/20 rounded-lg">
                <p className="text-body-small text-(--color-semantic-error)">{error}</p>
              </div>
            )}
          </div>

          <div className="flex gap-(--spacing-3) mt-(--spacing-6)">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-(--spacing-4) py-(--spacing-3) text-button text-(--color-text-secondary) border border-(--color-border-primary) rounded-lg hover:bg-(--color-background-secondary) disabled:opacity-50"
            >
              {SAVE_ROUTE_MODAL.BUTTONS.CANCEL}
            </button>
            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className={`flex-1 px-(--spacing-4) py-(--spacing-3) text-button text-(--color-text-inverse) rounded-lg transition-all duration-200 ${
                isLoading || !title.trim()
                  ? 'bg-(--color-brand-primary) opacity-50 cursor-not-allowed'
                  : 'bg-(--color-brand-secondary) hover:bg-(--color-brand-tertiary)'
              }`}
            >
              {isLoading
                ? isUpdating
                  ? SAVE_ROUTE_MODAL.BUTTONS.UPDATING
                  : SAVE_ROUTE_MODAL.BUTTONS.SAVING
                : isUpdating
                  ? SAVE_ROUTE_MODAL.BUTTONS.UPDATE
                  : SAVE_ROUTE_MODAL.BUTTONS.SAVE}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
