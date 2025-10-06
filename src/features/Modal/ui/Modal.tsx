import { X } from 'lucide-react';
import type { ModalProps } from '../model/types';
import { IconButton } from '@/shared/ui';
import { useModalScrollLock } from '../hooks/useModalScrollLock';
export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  useModalScrollLock({ isOpen, onClose });
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)] p-4 flex items-center justify-center bg-[rgba(3,7,18,0.45)] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl border border-[var(--color-border-primary)] bg-[var(--color-background-primary)] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="px-6 py-4 flex justify-between items-center border-b border-[var(--color-border-primary)] bg-[var(--color-brand-primary)]">
            <h2 className="text-heading-4 text-[var(--color-text-inverse)]">{title}</h2>
            <IconButton
              Icon={X}
              onClick={onClose}
              variant="ghost"
              size="md"
              aria-label="모달 닫기"
              className="text-[var(--color-text-inverse)]/80 hover:bg-white/70"
            />
          </div>
        )}
        <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
