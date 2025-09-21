export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export interface ContentCardGridProps {
  contents: CategoryContent[];
  isLoading?: boolean;
}
export type CategoryContent = {
  contentId: number;
  category: 'DRAMA' | 'MOVIE' | 'POP';
  title: string;
  posterImageUrl: string;
  releaseDate: string;
};

export interface ContentCardProps {
  content: CategoryContent;
}

export interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  categoryTitle: string;
}
