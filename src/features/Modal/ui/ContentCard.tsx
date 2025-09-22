import { useNavigate } from 'react-router-dom';
import type { ContentCardProps } from '../model/types';

export function ContentCard({ content }: ContentCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/content/${content.contentId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'DRAMA':
        return 'bg-blue-100 text-blue-800';
      case 'MOVIE':
        return 'bg-green-100 text-green-800';
      case 'POP':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer hover:-translate-y-1"
      onClick={handleClick}
    >
      <div className="relative w-full h-48 overflow-hidden">
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
      <div className="p-4">
        <span
          className={`inline-block text-xs font-medium px-2 py-1 rounded-md mb-2 ${getCategoryColor(content.category)}`}
        >
          {content.category}
        </span>
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {content.title}
        </h3>
        <p className="text-sm text-gray-500">{formatDate(content.releaseDate)}</p>
      </div>
    </div>
  );
}
