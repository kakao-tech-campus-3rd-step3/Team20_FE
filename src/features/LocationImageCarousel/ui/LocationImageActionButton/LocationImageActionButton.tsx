import { messages } from '../../model/messages';

interface LocationImageActionButtonProps {
  onClick: () => void;
  showAll: boolean;
}

export function LocationImageActionButton({ onClick, showAll }: LocationImageActionButtonProps) {
  return (
    <div className="text-center mt-(--spacing-12)">
      <button
        onClick={onClick}
        className="
          bg-(--color-brand-tertiary) text-heading-5 text-(--color-text-inverse) px-(--spacing-8) py-(--spacing-3) rounded-(--radius-xl) 
          transition-all hover:scale-105 active:scale-95"
      >
        {showAll ? '접기' : messages.allLocationView}
      </button>
    </div>
  );
}
