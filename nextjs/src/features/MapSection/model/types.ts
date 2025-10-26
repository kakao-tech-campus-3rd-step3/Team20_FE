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

export type KakaoPolyline = {
  setMap(map: KakaoMap | null): void;
  setPath(path: LatLng[]): void;
  setOptions(options: { strokeColor: string; strokeWeight: number; strokeOpacity: number }): void;
};

export type KakaoSize = {
  width: number;
  height: number;
};

export type KakaoPoint = {
  x: number;
  y: number;
};

export type KakaoMarkerImage = {
  src: string;
  size: KakaoSize;
  offset: KakaoPoint;
};

export type KakaoMapsNS = {
  load(callback: () => void): void;
  Map: new (container: HTMLElement, options: { center: LatLng; level: number }) => KakaoMap;
  LatLng: new (lat: number, lng: number) => LatLng;
  Marker: new (options: { position: LatLng; image?: KakaoMarkerImage }) => KakaoMarker;
  CustomOverlay: new (options: {
    content: string;
    map: KakaoMap;
    position: LatLng;
  }) => KakaoCustomOverlay;
  Polyline: new (options: {
    path: LatLng[];
    strokeColor: string;
    strokeWeight: number;
    strokeOpacity: number;
  }) => KakaoPolyline;
  Size: new (width: number, height: number) => KakaoSize;
  Point: new (x: number, y: number) => KakaoPoint;
  MarkerImage: new (
    src: string,
    size: KakaoSize,
    options: { offset: KakaoPoint },
  ) => KakaoMarkerImage;
  event: {
    addListener(target: KakaoMarker | KakaoMap, event: string, handler: () => void): void;
    removeListener(target: KakaoMarker | KakaoMap, event: string, handler: () => void): void;
  };
};

declare global {
  interface Window {
    kakao?: { maps?: KakaoMapsNS };
  }
}
