'use client';

import { Modal } from '@/features/Modal/ui/Modal';
import type { LoginRequiredModalProps } from '@/features/auth/model/types';
import { LOGIN_REQUIRED_MODAL } from '@/features/auth/model/messages';

export function LoginRequiredModal({ isOpen, onClose, onConfirm }: LoginRequiredModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={LOGIN_REQUIRED_MODAL.TITLE}>
      <div className="space-y-[var(--spacing-5)]">
        <p className="text-body text-[var(--color-text-primary)]">{LOGIN_REQUIRED_MODAL.DESCRIPTION}</p>
        <div className="flex gap-[var(--spacing-3)] justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-[var(--spacing-4)] py-[var(--spacing-3)] text-button text-[var(--color-text-secondary)] border border-[var(--color-border-primary)] rounded-lg hover:bg-[var(--color-background-secondary)]"
          >
            {LOGIN_REQUIRED_MODAL.BUTTONS.CANCEL}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-[var(--spacing-4)] py-[var(--spacing-3)] text-button text-[var(--color-text-inverse)] rounded-lg bg-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-tertiary)]"
          >
            {LOGIN_REQUIRED_MODAL.BUTTONS.GO_LOGIN}
          </button>
        </div>
      </div>
    </Modal>
  );
}

