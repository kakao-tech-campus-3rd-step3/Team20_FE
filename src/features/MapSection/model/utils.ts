import { toast } from 'react-toastify';
import type { Place } from '@/features/Sidebar/model/types';
import type { RoutePlace } from '@/features/RoutePlanning/model/types';
import type {
  KakaoMap,
  KakaoCustomOverlay,
  LatLng,
  KakaoMarker,
  KakaoPolyline,
  KakaoMapsNS,
} from './types';
import {
  OVERLAY_DEFAULTS,
  OVERLAY_STYLES,
  MARKER_CONFIG,
  IMAGE_FALLBACK_HIDDEN,
  IMAGE_FALLBACK_VISIBLE,
} from './constants';
import { OVERLAY_MESSAGES, ERROR_MESSAGES } from './messages';
import { getFirstImage } from '@/shared/utils/imageUtils';

export const getKakaoMaps = (): KakaoMapsNS => {
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

export function generateOverlayHTML(
  place: Place | RoutePlace,
  isLaptop: boolean = true,
  isInRoute: boolean = false,
): string {
  const {
    name = OVERLAY_DEFAULTS.name,
    address = OVERLAY_DEFAULTS.address,
    description = OVERLAY_DEFAULTS.description,
    imageUrl,
    relatedContents = [],
  } = place;

  const firstImage = getFirstImage(imageUrl);
  const imageHtml = firstImage
    ? `<img src="${firstImage}" alt="${name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />${IMAGE_FALLBACK_HIDDEN}`
    : IMAGE_FALLBACK_VISIBLE;

  const relatedContentsHtml =
    relatedContents.length > 0
      ? `<div style="${OVERLAY_STYLES.relatedContents}"><p style="${OVERLAY_STYLES.relatedContentsText}">${OVERLAY_MESSAGES.relatedContentsPrefix}${relatedContents.map((content) => content.title).join(', ')}</p></div>`
      : '';

  // 모바일/태블릿에서만 동선 추가 버튼 표시
  const addToRouteButtonHtml = !isLaptop
    ? `<div style="margin-top: 12px;">
         <button 
           onclick="window.addToRoute && window.addToRoute()" 
           style="width: 100%; display: flex; align-items: center; justify-content: center; gap: var(--spacing-2); padding: var(--spacing-3) var(--spacing-4); border-radius: 8px; font-size: 14px; font-weight: 500; transition: all 0.2s; box-shadow: var(--shadow-button); ${
             isInRoute
               ? 'background-color: var(--color-semantic-success)/10; color: var(--color-semantic-success); border: 1px solid var(--color-semantic-success)/20; cursor: default;'
               : 'background-color: var(--color-brand-secondary); color: var(--color-text-inverse); border: none; cursor: pointer;'
           }"
           ${!isInRoute ? "onmouseover=\"this.style.backgroundColor='var(--color-brand-tertiary)'; this.style.boxShadow='var(--shadow-button-hover)'\"" : ''}
           ${!isInRoute ? "onmouseout=\"this.style.backgroundColor='var(--color-brand-secondary)'; this.style.boxShadow='var(--shadow-button)'\"" : ''}
         >
           ${
             isInRoute
               ? `<svg style="width: 16px; height: 16px;" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              동선에 추가됨`
               : `<svg style="width: 16px; height: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              동선에 추가하기`
           }
         </button>
       </div>`
    : '';

  const responsiveContainerStyle = isLaptop
    ? OVERLAY_STYLES.container
    : OVERLAY_STYLES.container.replace('width: min(90vw, 400px);', 'width: min(85vw, 350px);');

  return `
    <div style="${responsiveContainerStyle}">
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
            ${addToRouteButtonHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function createMapOverlay(
  map: KakaoMap,
  place: Place | RoutePlace,
  position: LatLng,
  onClose: () => void,
  isLaptop: boolean = true,
  onAddToRoute?: (place: Place | RoutePlace) => void,
  isInRoute: boolean = false,
): KakaoCustomOverlay {
  const maps = getKakaoMaps();
  const content = generateOverlayHTML(place, isLaptop, isInRoute);

  (window as unknown as { closeMapOverlay?: () => void }).closeMapOverlay = onClose;

  // 동선 추가 함수를 전역으로 등록 (모바일에서만)
  if (!isLaptop && onAddToRoute) {
    (window as unknown as { addToRoute?: () => void }).addToRoute = () => {
      onAddToRoute(place);
    };
  }

  const overlay = new maps.CustomOverlay({
    content,
    map,
    position,
  });

  return overlay as KakaoCustomOverlay;
}

/**
 * 오버레이 위치를 결정하는 헬퍼 함수
 */
export function getOverlayPosition(
  map: KakaoMap,
  place: Place | RoutePlace,
  isLaptop: boolean,
): LatLng {
  return !isLaptop
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (map as any).getCenter()
    : createLatLng(place.latitude, place.longitude);
}

// 전역 오버레이 관리
declare global {
  var globalOverlayRef: KakaoCustomOverlay | null;
}

// 전역 변수 초기화
if (typeof globalThis !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).globalOverlayRef = null;
}

/**
 * 전역 오버레이를 닫는 공통 함수
 */
export function closeGlobalOverlay(): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((globalThis as any).globalOverlayRef) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).globalOverlayRef.setMap(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).globalOverlayRef = null;
  }
}

/**
 * 전역 오버레이를 설정하는 공통 함수
 */
export function setGlobalOverlay(overlay: KakaoCustomOverlay): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).globalOverlayRef = overlay;
}

/**
 * 마커 클릭 시 오버레이를 생성하고 표시하는 공통 함수
 */
export function createAndShowOverlay(
  map: KakaoMap,
  place: Place | RoutePlace,
  isLaptop: boolean,
  onAddToRoute?: (place: Place | RoutePlace) => void,
  isInRoute: boolean = false,
): void {
  try {
    closeGlobalOverlay();

    const position = getOverlayPosition(map, place, isLaptop);
    const overlay = createMapOverlay(
      map,
      place,
      position,
      closeGlobalOverlay,
      isLaptop,
      onAddToRoute,
      isInRoute,
    );
    setGlobalOverlay(overlay);
  } catch (e) {
    console.error('Failed to show place overlay:', e);
    toast.error('장소 정보 표시 실패');
  }
}
