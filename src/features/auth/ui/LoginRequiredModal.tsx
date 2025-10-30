import { Modal } from '@/features/Modal/ui/Modal';
import type { LoginRequiredModalProps } from '@/features/auth/model/types';
import { LOGIN_REQUIRED_MODAL } from '@/features/auth/model/messages';

export function LoginRequiredModal({ isOpen, onClose, onConfirm }: LoginRequiredModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={LOGIN_REQUIRED_MODAL.TITLE}>
      <div className="space-y-(--spacing-5)">
        <p className="text-body text-(--color-text-primary)">{LOGIN_REQUIRED_MODAL.DESCRIPTION}</p>
        <div className="flex gap-(--spacing-3) justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-(--spacing-4) py-(--spacing-3) text-button text-(--color-text-secondary) border border-(--color-border-primary) rounded-lg hover:bg-(--color-background-secondary)"
          >
            {LOGIN_REQUIRED_MODAL.BUTTONS.CANCEL}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-(--spacing-4) py-(--spacing-3) text-button text-(--color-text-inverse) rounded-lg bg-(--color-brand-secondary) hover:bg-(--color-brand-tertiary)"
          >
            {LOGIN_REQUIRED_MODAL.BUTTONS.GO_LOGIN}
          </button>
        </div>
      </div>
    </Modal>
  );
}
