import { getLocationDetail } from '@/entities/location/api/locationApi';
import { getContentLocations } from '@/entities/content/api/contentApi';
import type { Place } from '../model/types';
import type { ContentLocation } from '@/entities/content/model/types';
import type { LocationDetail } from '@/entities/location/model/types';
import type { ContentDetail } from '@/entities/content/model/types';
import type { ItineraryLocation } from '@/entities/itinerary/model/types';
import type { RoutePlace } from '@/features/RoutePlanning/model/types';

const createDefaultRoutePlace = (location: ItineraryLocation, order: number): RoutePlace => ({
  locationId: location.locationId,
  name: location.name,
  address: location.address,
  description: '',
  imageUrl: [],
  latitude: 0,
  longitude: 0,
  relatedContents: [],
  order,
});

export const hasAddress = (
  location: ContentLocation | LocationDetail,
): location is LocationDetail => {
  return 'address' in location;
};

export const convertContentLocationToPlace = (location: ContentLocation): Place => ({
  locationId: location.locationId,
  name: '', // ContentLocation에 name 없음
  address: '주소 정보 없음',
  description: location.sceneDescription || '',
  imageUrl: [], // ContentLocation에 imageUrl 없음
  latitude: 0,
  longitude: 0,
  relatedContents: [],
});

export const convertLocationsToPlaces = async (locations: ContentLocation[]): Promise<Place[]> => {
  return Promise.all(
    locations.map(async (location: ContentLocation) => {
      try {
        const locationDetail = await getLocationDetail(location.locationId.toString());
        return {
          ...locationDetail,
          description: location.sceneDescription || locationDetail.description,
        } as Place;
      } catch {
        return convertContentLocationToPlace(location);
      }
    }),
  );
};

export const getPlacesFromContents = async (
  contents: ContentDetail[] | Array<{ contentId: number }>,
): Promise<Place[]> => {
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

export const convertItineraryLocationsToRoutePlaces = async (
  locations: ItineraryLocation[],
): Promise<RoutePlace[]> => {
  return Promise.all(
    locations.map(async (location: ItineraryLocation) => {
      try {
        const locationDetail = await getLocationDetail(location.locationId.toString());
        return {
          ...locationDetail,
          order: location.visitOrder,
        } as RoutePlace;
      } catch (error) {
        console.warn(`장소 정보를 가져오는데 실패했습니다. ${location.locationId}:`, error);
        return createDefaultRoutePlace(location, location.visitOrder);
      }
    }),
  );
};
