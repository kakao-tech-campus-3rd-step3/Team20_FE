import type { Place } from '@/features/Sidebar/model/types';
import type {
  KakaoMap,
  KakaoCustomOverlay,
  LatLng,
  KakaoMarker,
  KakaoPolyline,
  KakaoMapsNS,
} from './types';
import { OVERLAY_DEFAULTS, OVERLAY_STYLES, MARKER_CONFIG } from './constants';
import { OVERLAY_MESSAGES, ERROR_MESSAGES } from './messages';

const getKakaoMaps = (): KakaoMapsNS => {
  const maps = window.kakao?.maps;
  if (!maps) throw new Error(ERROR_MESSAGES.sdkNotReady);
  return maps;
};

export const createLatLng = (lat: number, lng: number) => {
  const maps = getKakaoMaps();
  return new maps.LatLng(lat, lng);
};

export const clearMarkers = (markers: KakaoMarker[]) => {
  markers.forEach((m) => m.setMap(null));
  return [];
};

export const clearOverlay = (overlay: KakaoCustomOverlay | null) => {
  if (overlay) {
    overlay.setMap(null);
  }
  return null;
};

export const clearPolylines = (polylines: KakaoPolyline[]) => {
  polylines.forEach((polyline) => polyline.setMap(null));
  return [];
};

export const createNumberedMarkerImage = (order: number) => {
  const maps = getKakaoMaps();

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  const { SIZE, BACKGROUND_COLOR, BORDER_COLOR, BORDER_WIDTH, TEXT_COLOR, FONT } = MARKER_CONFIG;
  const radius = SIZE / 2;
  canvas.width = SIZE;
  canvas.height = SIZE;

  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.beginPath();
  ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
  ctx.fill();

  ctx.strokeStyle = BORDER_COLOR;
  ctx.lineWidth = BORDER_WIDTH;
  ctx.stroke();

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = FONT;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(order.toString(), radius, radius);

  const imageDataUrl = canvas.toDataURL();
  const imageSize = new maps.Size(SIZE, SIZE);
  const imageOption = { offset: new maps.Point(SIZE / 2, SIZE) };

  return new maps.MarkerImage(imageDataUrl, imageSize, imageOption);
};

export function generateOverlayHTML(place: Place): string {
  const {
    name = OVERLAY_DEFAULTS.name,
    address = OVERLAY_DEFAULTS.address,
    description = OVERLAY_DEFAULTS.description,
    locationImage,
    relatedContents = [],
  } = place;

  const imageHtml = locationImage
    ? `<img src="${locationImage}" alt="${name}" style="width: 100%; height: 100%; object-fit: cover;" />`
    : `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: var(--color-text-tertiary);"><svg style="width: 24px; height: 24px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div>`;

  const relatedContentsHtml =
    relatedContents.length > 0
      ? `<div style="${OVERLAY_STYLES.relatedContents}"><p style="${OVERLAY_STYLES.relatedContentsText}">${OVERLAY_MESSAGES.relatedContentsPrefix}${relatedContents.map((content) => content.title).join(', ')}</p></div>`
      : '';

  return `
    <div style="${OVERLAY_STYLES.container}">
      <div style="${OVERLAY_STYLES.header}">
        <h3 style="${OVERLAY_STYLES.title}">${name}</h3>
        <button onclick="window.closeMapOverlay && window.closeMapOverlay()" style="${OVERLAY_STYLES.closeButton}" onmouseover="this.style.backgroundColor='var(--color-background-tertiary)'" onmouseout="this.style.backgroundColor='transparent'" aria-label="${OVERLAY_MESSAGES.closeButton}">
          <svg style="width: 20px; height: 20px; color: var(--color-text-tertiary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div style="${OVERLAY_STYLES.content}">
        <div style="${OVERLAY_STYLES.body}">
          <div style="${OVERLAY_STYLES.thumbnail}">
            <div style="${OVERLAY_STYLES.thumbnailImage}">
              ${imageHtml}
            </div>
          </div>
          <div style="${OVERLAY_STYLES.info}">
            <p style="${OVERLAY_STYLES.address}">${address}</p>
            <div style="${OVERLAY_STYLES.scene}">
              <div style="${OVERLAY_STYLES.sceneHeader}">
                <svg style="${OVERLAY_STYLES.sceneIcon}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span style="${OVERLAY_STYLES.sceneLabel}">${OVERLAY_MESSAGES.sceneLabel}</span>
              </div>
              <p style="${OVERLAY_STYLES.sceneDescription}">${description}</p>
            </div>
            ${relatedContentsHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function createMapOverlay(
  map: KakaoMap,
  place: Place,
  position: LatLng,
  onClose: () => void,
): KakaoCustomOverlay {
  const maps = getKakaoMaps();
  const content = generateOverlayHTML(place);

  (window as unknown as { closeMapOverlay?: () => void }).closeMapOverlay = onClose;

  return new maps.CustomOverlay({
    content,
    map,
    position,
  });
}
