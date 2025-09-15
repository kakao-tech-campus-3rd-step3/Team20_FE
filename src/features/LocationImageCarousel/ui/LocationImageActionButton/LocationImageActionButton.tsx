import { messages } from '../../model/messages';

export function LocationImageActionButton() {
  return (
    <div className="text-center mt-(--spacing-12)">
      <button
        className="
          bg-(--color-brand-tertiary) text-heading-5 text-(--color-text-inverse) px-(--spacing-8) py-(--spacing-3) rounded-(--radius-xl) 
          transition-all hover:scale-105 active:scale-95"
      >
        {messages.allLocationView}
      </button>
    </div>
  );
}
