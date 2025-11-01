'use client';

import { Modal } from '@/features/Modal/ui/Modal';
import { SAVE_ROUTE_MODAL } from '../../model/messages';
import type { SaveSuccessModalProps } from '../../model/types';

export function SaveSuccessModal({ isOpen, onClose, onConfirm }: SaveSuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={SAVE_ROUTE_MODAL.SUCCESS.TITLE}>
      <div className="space-y-(--spacing-5)">
        <p className="text-body text-(--color-text-primary)">{SAVE_ROUTE_MODAL.SUCCESS.MESSAGE}</p>
        <div className="flex gap-(--spacing-3) justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-(--spacing-4) py-(--spacing-3) text-button text-(--color-text-secondary) border border-(--color-border-primary) rounded-lg hover:bg-(--color-background-secondary)"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-(--spacing-4) py-(--spacing-3) text-button text-(--color-text-inverse) rounded-lg bg-(--color-brand-secondary) hover:bg-(--color-brand-tertiary)"
          >
            {SAVE_ROUTE_MODAL.SUCCESS.GO_MYPAGE}
          </button>
        </div>
      </div>
    </Modal>
  );
}

