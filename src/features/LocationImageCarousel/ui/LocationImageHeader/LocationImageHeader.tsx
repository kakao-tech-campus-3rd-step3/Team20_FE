import { messages } from '../../model/messages';

export function LocationImageHeader() {
  return (
    <div className="text-center mb-(--spacing-12)">
      <h2 className="text-heading-1 md:text-display-1 font-bold text-(--color-text-inverse) mb-(--spacing-4)">
        {messages.title}
      </h2>
      <p className="text-heading-4 text-(--color-gray-300) max-w-2xl mx-auto">
        {messages.description}
      </p>
    </div>
  );
}
