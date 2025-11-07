import { useCallback, useRef } from 'react';

/**
 * 강제 리플로우를 방지하기 위한 최적화 훅
 * DOM 읽기와 쓰기 작업을 분리하여 성능을 개선합니다.
 */
export function useLayoutOptimization() {
    const readOperations = useRef<(() => unknown)[]>([]);
    const writeOperations = useRef<(() => void)[]>([]);

    const scheduleRead = useCallback((operation: () => unknown) => {
        readOperations.current.push(operation);
    }, []);

    const scheduleWrite = useCallback((operation: () => void) => {
        writeOperations.current.push(operation);
    }, []);

    const flush = useCallback(() => {
        // 모든 읽기 작업을 먼저 수행
        const readResults = readOperations.current.map(op => op());
        readOperations.current = [];

        // 그 다음 모든 쓰기 작업을 수행
        writeOperations.current.forEach(op => op());
        writeOperations.current = [];

        return readResults;
    }, []);

    const optimizedMeasure = useCallback((element: HTMLElement | null) => {
        if (!element) return null;

        // 한 번에 모든 측정값을 읽어옴
        return {
            width: element.offsetWidth,
            height: element.offsetHeight,
            scrollTop: element.scrollTop,
            scrollLeft: element.scrollLeft,
            rect: element.getBoundingClientRect(),
        };
    }, []);

    return {
        scheduleRead,
        scheduleWrite,
        flush,
        optimizedMeasure,
    };
}

/**
 * 애니메이션 성능을 위한 requestAnimationFrame 기반 훅
 */
export function useAnimationFrame() {
    const rafId = useRef<number | undefined>(undefined);

    const scheduleAnimation = useCallback((callback: () => void) => {
        if (rafId.current !== undefined) {
            cancelAnimationFrame(rafId.current);
        }

        rafId.current = requestAnimationFrame(callback);
    }, []);

    const cancelAnimation = useCallback(() => {
        if (rafId.current !== undefined) {
            cancelAnimationFrame(rafId.current);
            rafId.current = undefined;
        }
    }, []);

    return {
        scheduleAnimation,
        cancelAnimation,
    };
}