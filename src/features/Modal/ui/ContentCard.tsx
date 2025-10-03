import { useNavigate } from '@tanstack/react-router';
import type { ContentCardProps } from '../model/types';

export function ContentCard({ content }: ContentCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: '/content/$id', params: { id: String(content.contentId) } });
  };

  return (
    <div
      className="rounded-xl overflow-hidden cursor-pointer transition-all duration-200 bg-(--color-background-primary) border border-(--color-border-primary) shadow-[var(--shadow-card)] hover:shadow-[0_12px_28px_-12px_rgba(3,7,18,0.35)] hover:-translate-y-1"
      onClick={handleClick}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <img
          src={content.posterImageUrl}
          alt={content.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-image.png';
          }}
        />
      </div>
    </div>
  );
}
