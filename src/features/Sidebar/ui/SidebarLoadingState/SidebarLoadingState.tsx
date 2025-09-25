import { SIDEBAR_STATUS_TEXT } from '../../model/messages';

export function SidebarLoadingState() {
  return (
    <div className="p-4 text-center text-(--color-text-secondary)">
      {SIDEBAR_STATUS_TEXT.LOADING}
    </div>
  );
}
