import { Modal } from './Modal';
import { ContentCardGrid } from './ContentCardGrid';
import type { CategoryModalProps } from '../model/types';
import { useCategoryContents } from '../../../entities/content/api/queryfn';
export function CategoryModal({ isOpen, onClose, category, categoryTitle }: CategoryModalProps) {
  const { data } = useCategoryContents(category);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={categoryTitle}>
      <ContentCardGrid contents={data || []} />
    </Modal>
  );
}
