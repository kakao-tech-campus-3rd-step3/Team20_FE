import { Link } from '@tanstack/react-router';

interface FormNavigationProps {
  leftLink?: {
    to: string;
    text: string;
  };
  rightText?: string;
  rightLink?: {
    to: string;
    text: string;
  };
}

export const FormNavigation = ({ leftLink, rightText, rightLink }: FormNavigationProps) => {
  return (
    <div className="flex justify-between items-center pt-6">
      {leftLink && (
        <div className="text-left">
          <Link
            to={leftLink.to}
            className="text-base text-purple-600 hover:text-purple-500 font-medium transition-colors"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            {leftLink.text}
          </Link>
        </div>
      )}

      {rightText && rightLink && (
        <div className="text-right">
          <span className="text-base text-gray-600" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            {rightText}{' '}
          </span>
          <Link
            to={rightLink.to}
            className="text-base text-purple-600 hover:text-purple-500 font-semibold transition-colors"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            {rightLink.text}
          </Link>
        </div>
      )}
    </div>
  );
};
