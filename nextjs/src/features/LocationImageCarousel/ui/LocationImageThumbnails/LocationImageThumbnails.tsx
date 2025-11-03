'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { LocationImageThumbnailsProps } from '../../model/types';

export function LocationImageThumbnails({
  scenes,
  currentIndex,
  onGoToSlide,
}: LocationImageThumbnailsProps) {
  const router = useRouter();

  const handleThumbnailClick = (sceneId: string, event: React.MouseEvent) => {
    event.preventDefault();
    router.push(`/location/${sceneId}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-[var(--spacing-4)]">
      {scenes.map((scene, index) => (
        <div
          key={scene.id}
          onClick={(event) => {
            if (event.ctrlKey || event.metaKey) {
              // Ctrl/Cmd + 클릭시 슬라이드 변경
              onGoToSlide(index);
            } else {
              // 일반 클릭시 location 상세 페이지로 이동
              handleThumbnailClick(scene.id.toString(), event);
            }
          }}
          className={`relative aspect-video rounded-[var(--radius-xl)] overflow-hidden cursor-pointer transition-all duration-300 ${
            index === currentIndex
              ? 'ring-2 ring-[var(--color-brand-secondary)] scale-105'
              : 'hover:scale-105 hover:shadow-[var(--shadow-lg)]'
          }`}
        >
          <Image 
            src={scene.image || '/placeholder-image.jpg'} 
            alt={scene.title} 
            fill className="object-cover" 
            sizes="(max-width: 768px) 50vw, 25vw" 
            unoptimized
          />

          <div className="absolute inset-0 bg-[var(--color-gray-900)]/20 hover:bg-[var(--color-gray-900)]/40 transition-colors" />

          <div className="absolute top-[var(--spacing-2)] right-[var(--spacing-2)] bg-[var(--color-brand-secondary)]/90 backdrop-blur-sm text-[var(--color-text-inverse)] text-caption px-[var(--spacing-2)] py-[var(--spacing-1)] rounded">
            {scene.episode}
          </div>

          <div className="absolute bottom-[var(--spacing-2)] left-[var(--spacing-2)] text-[var(--color-text-inverse)] text-caption font-medium bg-[var(--color-gray-900)]/50 px-[var(--spacing-2)] py-[var(--spacing-1)] rounded">
            {index + 1}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-[var(--spacing-3)] bg-gradient-to-t from-[var(--color-gray-900)]/80 to-transparent">
            <h4 className="text-[var(--color-text-inverse)] text-body-small font-medium truncate">
              {scene.title}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}
