import { MENU } from '../../model/utils';
import type { NavKey, MobileNavMenuProps } from '../../model/types';
import { useResolvedActiveKey, useNavActions } from '../../model/hooks';

export function MobileNavMenu({
  active: controlledActive,
  onSelect,
  isOpen,
  onClose,
}: MobileNavMenuProps) {
  const activeKey = useResolvedActiveKey(controlledActive);
  const { onItemClick } = useNavActions(onSelect, onClose);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[var(--z-overlay)] md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute top-full left-0 right-0 bg-[var(--color-background)] border-t border-[var(--color-border)] shadow-[var(--shadow-dropdown)] z-[var(--z-dropdown)] md:hidden">
        <nav aria-label="주요 메뉴" className="p-[var(--spacing-4)]">
          <div className="space-y-[var(--spacing-2)]">
            {MENU.map(({ key, label, Icon }) => {
              const isActive = key === activeKey;
              return (
                <button
                  key={key}
                  className={`w-full flex items-center gap-[var(--spacing-3)] px-[var(--spacing-4)] py-[var(--spacing-3)] rounded-lg text-left transition-colors duration-200 ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                      : 'text-[var(--color-text-primary)] hover:bg-[var(--color-muted)]'
                  }`}
                  onClick={() => onItemClick(key as NavKey)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-[var(--spacing-5)] w-[var(--spacing-5)]" aria-hidden />
                  <span className="text-body-medium font-medium">{label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
