import { messages } from '../model/messages';
import { Link } from 'react-router-dom';

export function SpotCard() {
  return (
    <div className="p-[var(--spacing-4)] bg-[var(--color-background-primary)]">
      <h3 className="text-heading-5 text-[var(--color-text-primary)] mb-[var(--spacing-2)]">
        {messages.selectedSpotTitle}
      </h3>
      <div className="flex gap-[var(--spacing-2)]">
        <div className="h-20 w-28 rounded-lg bg-[var(--color-gray-100)]" />
        <div className="flex-1">
          <p className="text-body-small font-medium text-[var(--color-text-primary)]">
            {messages.sampleSpotName}
          </p>
          <p className="text-caption text-[var(--color-text-secondary)]">
            {messages.sampleSpotMeta}
          </p>
          <div className="mt-[var(--spacing-2)] flex gap-[var(--spacing-2)]">
            <Link
              to="/save"
              className="px-[var(--spacing-button-padding-x)] py-[var(--spacing-button-padding-y)] rounded-lg border border-[var(--color-border-primary)] text-button text-[var(--color-text-primary)] bg-[var(--color-background-primary)] hover:bg-[var(--color-background-secondary)] transition duration-200"
            >
              {messages.save}
            </Link>
            <Link
              to="/map/directions"
              className="px-[var(--spacing-button-padding-x)] py-[var(--spacing-button-padding-y)] rounded-lg border border-[var(--color-border-primary)] text-button text-[var(--color-text-primary)] bg-[var(--color-background-primary)] hover:bg-[var(--color-background-secondary)] transition duration-200"
            >
              {messages.directions}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
