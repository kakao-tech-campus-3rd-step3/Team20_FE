import { SIDEBAR_EMPTY_STATE } from '../../model/messages';

export function SidebarEmptyState() {
  return (
    <div className="p-(--spacing-6) text-center">
      <div className="mb-(--spacing-4)">
        <div className="w-16 h-16 mx-auto mb-(--spacing-3) bg-(--color-background-secondary) rounded-full flex items-center justify-center">
          <span className="text-2xl">🎬</span>
        </div>
        <h3 className="text-heading-6 text-(--color-text-primary) mb-(--spacing-2)">
          {SIDEBAR_EMPTY_STATE.TITLE}
        </h3>
        <p className="text-body text-(--color-text-secondary) mb-(--spacing-4)">
          {SIDEBAR_EMPTY_STATE.DESCRIPTION}
        </p>
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-2 text-caption text-(--color-text-tertiary)">
            <span className="w-2 h-2 bg-(--color-brand-primary) rounded-full"></span>
            <span>{SIDEBAR_EMPTY_STATE.SEARCH_TIPS.DRAMA}</span>
          </div>
          <div className="flex items-center gap-2 text-caption text-(--color-text-tertiary)">
            <span className="w-2 h-2 bg-(--color-brand-primary) rounded-full"></span>
            <span>{SIDEBAR_EMPTY_STATE.SEARCH_TIPS.PLACE}</span>
          </div>
          <div className="flex items-center gap-2 text-caption text-(--color-text-tertiary)">
            <span className="w-2 h-2 bg-(--color-brand-primary) rounded-full"></span>
            <span>{SIDEBAR_EMPTY_STATE.SEARCH_TIPS.REGION}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
