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
import { DRAG_STYLES } from '../../model/constants';
import { useSaveRouteModal } from '../../model/hooks/useSaveRouteModal';
import { useDragScrollLock } from '../../model/hooks/useDragScrollLock';
import { useBreakpoints } from '@/shared/hooks/useMediaQuery';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export function RouteSidebar({
  className,
  places,
  onSaveRoute,
  onRemovePlace,
  onReorderPlaces,
}: RouteSidebarProps) {
  const { isLaptop } = useBreakpoints();
  const isEmpty = places.length === 0;
  const { isModalOpen, openModal, closeModal, handleSave } = useSaveRouteModal({
    onSaveRoute,
  });
  const { lockScroll, unlockScroll } = useDragScrollLock();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = places.findIndex((place) => place.locationId === active.id);
      const newIndex = places.findIndex((place) => place.locationId === over.id);

      const newPlaces = arrayMove(places, oldIndex, newIndex);
      onReorderPlaces?.(newPlaces);
    }
  };

  return (
    <aside
      className={[
        'overflow-hidden h-full',
        className ?? 'w-full max-w-sm sm:max-w-md lg:w-96 lg:flex-shrink-0',
      ].join(' ')}
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

        <div className="flex-1 overflow-y-auto" style={DRAG_STYLES.CONTAINER}>
          {isEmpty ? (
            <RouteSidebarEmptyState />
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={lockScroll}
              onDragEnd={(event) => {
                unlockScroll();
                handleDragEnd(event);
              }}
            >
              <SortableContext
                items={places.map((place) => place.locationId)}
                strategy={verticalListSortingStrategy}
              >
                <div className="p-(--spacing-4) space-y-(--spacing-3)">
                  {places.map((place) => (
                    <RoutePlaceCard
                      key={place.locationId}
                      place={place}
                      onRemove={() => onRemovePlace?.(place.locationId)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>

        {!isEmpty && (
          <div className="p-(--spacing-4) bg-(--color-background-secondary) border-t border-(--color-border-primary)">
            <div className="space-y-(--spacing-3)">
              <div className="text-center">
                <p className="text-caption text-(--color-text-tertiary)">
                  {formatLocations(places.length)}
                </p>
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
