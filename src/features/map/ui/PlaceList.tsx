import React from "react";
import { PlaceCard } from "@/features/map/ui/PlaceCard";
import type { PlaceListProps } from "@/features/map/model/types";
import { MOCK_PLACES } from "@/__mocks__/mockPlace";

export const PlaceList: React.FC<PlaceListProps> = ({
  places = MOCK_PLACES,
  className,
}) => {
  return (
    <div className={"divide-y divide-gray-100 " + (className ?? "")}>
      {places.map((place, index) => (
        <PlaceCard
          key={place.id}
          name={place.name}
          address={place.address}
          tags={place.tags}
          rating={place.rating}
          thumbnailUrl={place.thumbnailUrl}
          badgeNumber={index + 1}
        />
      ))}
    </div>
  );
};
