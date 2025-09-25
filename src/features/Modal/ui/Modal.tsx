import { X } from 'lucide-react';
import type { ModalProps } from '../model/types';
import { IconButton } from '@/shared/ui';
import { useModalScrollLock } from '../hooks/useModalScrollLock';
export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  useModalScrollLock({ isOpen, onClose });
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-white/20 bg-opacity-20 flex items-center justify-center z-[var(--z-modal)] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
            <IconButton
              Icon={X}
              onClick={onClose}
              variant="ghost"
              size="md"
              aria-label="모달 닫기"
              className="text-gray-400 hover:text-gray-600"
            />
          </div>
        )}
        <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
