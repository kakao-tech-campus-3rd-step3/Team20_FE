import { SIDEBAR_STATUS_TEXT } from '../../model/messages';

export function SidebarErrorState() {
  return (
    <div className="p-4 text-center text-(--color-text-error)">{SIDEBAR_STATUS_TEXT.ERROR}</div>
  );
}
