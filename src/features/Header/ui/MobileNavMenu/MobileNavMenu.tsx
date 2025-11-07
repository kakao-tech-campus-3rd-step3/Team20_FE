import type { NavKey, MobileNavMenuProps } from '../../model/types';
import { useResolvedActiveKey } from '../../model/hooks';
import { useNavMenu } from '../../model/useNavMenu';

export function MobileNavMenu({
  active: controlledActive,
  onSelect,
  isOpen,
  onClose,
}: MobileNavMenuProps) {
  const activeKey = useResolvedActiveKey(controlledActive);
  const { menuItems, handleNavClick } = useNavMenu(onSelect, onClose);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-(--z-overlay) md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute top-full left-0 right-0 bg-(--color-background) border-t border-(--color-border) shadow-(--shadow-dropdown) z-(--z-dropdown) md:hidden">
        <nav aria-label="주요 메뉴" className="p-(--spacing-4)">
          <div className="space-y-(--spacing-2)">
            {menuItems.map(({ key, label, Icon }) => {
              const isActive = key === activeKey;
              return (
                <button
                  key={key}
                  className={`w-full flex items-center gap-(--spacing-3) px-(--spacing-4) py-(--spacing-3) rounded-lg text-left transition-colors duration-200 ${
                    isActive
                      ? 'bg-(--color-primary) text-(--color-primary-foreground)'
                      : 'text-(--color-text-primary) hover:bg-(--color-muted)'
                  }`}
                  onClick={() => handleNavClick(key as NavKey)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-(--spacing-5) w-(--spacing-5)" aria-hidden />
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
