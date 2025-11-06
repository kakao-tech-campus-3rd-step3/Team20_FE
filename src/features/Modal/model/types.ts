import type { CategoryContent } from '@/entities/content/model/types';
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export interface ContentCardGridProps {
  contents: CategoryContent[];
}

export interface ContentCardProps {
  content: CategoryContent;
}

export interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  categoryTitle: string;
}

export interface UseModalScrollLockProps {
  isOpen: boolean;
  onClose: () => void;
}
