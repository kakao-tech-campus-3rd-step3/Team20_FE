import { RoutePlaceCard } from '../RoutePlaceCard/RoutePlaceCard';
import { RouteSidebarEmptyState } from '../RouteSidebarEmptyState/RouteSidebarEmptyState';
import { SaveRouteModal } from '../SaveRouteModal/SaveRouteModal';
import type { RouteSidebarProps } from '../../model/types';
import {
  ROUTE_SIDEBAR_TITLES,
  ROUTE_SIDEBAR_BUTTONS,
  ROUTE_SIDEBAR_ICONS,
  ROUTE_SIDEBAR_STYLES,
  formatRouteCount,
  formatLocations,
} from '../../model/messages';
import { useSaveRouteModal } from '../../model/hooks/useSaveRouteModal';
import { useBreakpoints } from '@/shared/hooks/useMediaQuery';

export function RouteSidebar({
  className,
  places,
  onSaveRoute,
  onRemovePlace,
  onReorderPlaces,
  createRouteSidebarHandlers,
}: RouteSidebarProps) {
  const { isLaptop } = useBreakpoints();
  const isEmpty = places.length === 0;
  const { handleDragStart, handleDrop } = createRouteSidebarHandlers(places, onReorderPlaces);
  const { isModalOpen, openModal, closeModal, handleSave } = useSaveRouteModal({
    onSaveRoute,
  });

  return (
    <aside
      className={['w-full lg:w-96 lg:flex-shrink-0 overflow-hidden h-full', className ?? ''].join(
        ' ',
      )}
    >
      <div className="bg-(--color-background-primary) shadow-(--shadow-card) rounded-l-2xl flex flex-col border-l border-(--color-border-primary) overflow-hidden h-full">
        {isLaptop && (
          <div className="p-(--spacing-6) bg-gradient-to-r from-(--color-brand-secondary) to-(--color-brand-tertiary) text-(--color-text-inverse)">
            <h2 className="text-heading-4 mb-(--spacing-2)">{ROUTE_SIDEBAR_TITLES.HEADER_TITLE}</h2>
            <p className="text-body-small text-(--color-gray-100)">
              {isEmpty ? ROUTE_SIDEBAR_TITLES.SUBTITLE : formatRouteCount(places.length)}
            </p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {isEmpty ? (
            <RouteSidebarEmptyState />
          ) : (
            <div className="p-(--spacing-4) space-y-(--spacing-3)">
              {places
                .sort((a, b) => a.order - b.order)
                .map((place) => (
                  <RoutePlaceCard
                    key={place.locationId}
                    place={place}
                    onRemove={() => onRemovePlace?.(place.locationId)}
                    onDragStart={handleDragStart(place)}
                    onDrop={handleDrop(place)}
                  />
                ))}
            </div>
          )}
        </div>

        {!isEmpty && (
          <div className="p-(--spacing-4) bg-(--color-background-secondary) border-t border-(--color-border-primary)">
            <div className="space-y-(--spacing-3)">
              <div className="text-center">
                <p className="text-caption text-(--color-text-secondary) mb-(--spacing-2)">
                  {ROUTE_SIDEBAR_TITLES.FOOTER_TITLE}
                </p>
                <div className="flex items-center justify-center gap-(--spacing-4) text-caption text-(--color-text-tertiary)">
                  <span>{formatLocations(places.length)}</span>
                  <span>{ROUTE_SIDEBAR_ICONS.ESTIMATED_TIME}</span>
                </div>
              </div>

              <button onClick={openModal} className={ROUTE_SIDEBAR_STYLES.SAVE_BUTTON}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={ROUTE_SIDEBAR_ICONS.SAVE_ICON_PATH}
                  />
                </svg>
                {ROUTE_SIDEBAR_BUTTONS.SAVE_ROUTE}
              </button>
            </div>
          </div>
        )}
      </div>

      <SaveRouteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        places={places}
        onSave={handleSave}
      />
    </aside>
  );
}
