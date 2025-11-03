import { messages } from '../../model/messages';

export function LocationImageHeader() {
  return (
    <div className="text-center mb-[var(--spacing-12)]">
      <h2 className="text-heading-1 md:text-heding-4 font-bold text-[var(--color-text-inverse)] mb-[var(--spacing-4)]">
        {messages.title}
      </h2>
      <p className="text-heading-4 text-[var(--color-gray-300)] max-w-2xl mx-auto">
        {messages.description}
      </p>
    </div>
  );
}
