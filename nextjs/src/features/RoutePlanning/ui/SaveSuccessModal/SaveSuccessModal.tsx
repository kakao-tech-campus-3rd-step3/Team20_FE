'use client';

import { Modal } from '@/features/Modal/ui/Modal';
import { SAVE_ROUTE_MODAL } from '../../model/messages';
import type { SaveSuccessModalProps } from '../../model/types';

export function SaveSuccessModal({ isOpen, onClose, onConfirm }: SaveSuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={SAVE_ROUTE_MODAL.SUCCESS.TITLE}>
      <div className="space-y-[var(--spacing-5)]">
        <p className="text-body text-[var(--color-text-primary)]">{SAVE_ROUTE_MODAL.SUCCESS.MESSAGE}</p>
        <div className="flex gap-[var(--spacing-3)] justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-[var(--spacing-4)] py-[var(--spacing-3)] text-button text-[var(--color-text-secondary)] border border-[var(--color-border-primary)] rounded-lg hover:bg-[var(--color-background-secondary)]"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-[var(--spacing-4)] py-[var(--spacing-3)] text-button text-[var(--color-text-inverse)] rounded-lg bg-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-tertiary)]"
          >
            {SAVE_ROUTE_MODAL.SUCCESS.GO_MYPAGE}
          </button>
        </div>
      </div>
    </Modal>
  );
}

