import { messages } from '../../model/messages';

interface LocationImageActionButtonProps {
  onClick: () => void;
  showAll: boolean;
}

export function LocationImageActionButton({ onClick, showAll }: LocationImageActionButtonProps) {
  return (
    <div className="text-center mt-[var(--spacing-12)]">
      <button
        onClick={onClick}
        className="
          bg-[var(--color-brand-tertiary)] text-heading-5 text-[var(--color-text-inverse)] px-[var(--spacing-8)] py-[var(--spacing-3)] rounded-[var(--radius-xl)] 
          transition-all hover:scale-105 active:scale-95"
      >
        {showAll ? '접기' : messages.allLocationView}
      </button>
    </div>
  );
}
