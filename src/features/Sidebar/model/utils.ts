import { getLocationDetail } from '@/entities/location/api/locationApi';
import { getContentLocations } from '@/entities/content/api/contentApi';
import type { Place } from '../model/types';
import type { ContentLocation } from '@/entities/content/model/types';
import type { LocationDetail } from '@/entities/location/model/types';
import type { ContentDetail } from '@/entities/content/model/types';

export const hasAddress = (
  location: ContentLocation | LocationDetail,
): location is LocationDetail => {
  return 'address' in location;
};

export const convertContentLocationToPlace = (location: ContentLocation): Place => ({
  locationId: location.location_id,
  name: location.name,
  address: '주소 정보 없음',
  description: location.scene_description,
  locationImage: location.location_image_url,
  latitude: 0,
  longitude: 0,
  relatedContents: [],
});

export const convertLocationsToPlaces = async (locations: ContentLocation[]): Promise<Place[]> => {
  return Promise.all(
    locations.map(async (location: ContentLocation) => {
      try {
        const locationDetail = await getLocationDetail(location.location_id.toString());
        return locationDetail as Place;
      } catch {
        return convertContentLocationToPlace(location);
      }
    }),
  );
};

export const getPlacesFromContents = async (contents: ContentDetail[]): Promise<Place[]> => {
  const allPlaces: Place[] = [];

  for (const content of contents) {
    try {
      const locations = await getContentLocations(content.contentId.toString());
      const places = await convertLocationsToPlaces(locations);
      allPlaces.push(...places);
    } catch (error) {
      console.warn(`장소를 찾는 것에 실패했습니다. ${content.contentId}:`, error);
    }
  }

  return allPlaces;
};
