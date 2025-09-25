import type { RefObject } from 'react';

export type LatLng = { lat: number; lng: number };

export type MapOptions = {
  center?: LatLng;
  level?: number;
  draggable?: boolean;
  scrollwheel?: boolean;
};

export type MapContainerUiProps = {
  containerRef: RefObject<HTMLDivElement | null>;
  className?: string;
  ariaLabel?: string;
};

export type KakaoMap = {
  setCenter(latlng: LatLng): void;
  setLevel(level: number): void;
  setDraggable(flag: boolean): void;
  setZoomable(flag: boolean): void;
};

export type KakaoMarker = {
  setMap(map: KakaoMap | null): void;
  getPosition(): LatLng;
};

export type KakaoCustomOverlay = {
  setMap(map: KakaoMap | null): void;
  setPosition(position: LatLng): void;
  setContent(content: string): void;
};

export type KakaoMapsNS = {
  Map: new (container: HTMLElement, options: { center: LatLng; level: number }) => KakaoMap;
  LatLng: new (lat: number, lng: number) => LatLng;
  Marker: new (options: { position: LatLng }) => KakaoMarker;
  CustomOverlay: new (options: {
    content: string;
    map: KakaoMap;
    position: LatLng;
  }) => KakaoCustomOverlay;
  event: {
    addListener(target: KakaoMarker, event: string, handler: () => void): void;
  };
};

declare global {
  interface Window {
    kakao?: { maps?: KakaoMapsNS };
  }
}
