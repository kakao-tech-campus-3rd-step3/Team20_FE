import type { ButtonProps } from '../model/types';
import { Link } from 'react-router-dom';

export function Button({ href, children, variant = 'primary' }: ButtonProps) {
  const baseStyles = 'px-5 py-3 rounded-xl transition-colors';

  const variants = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800',
    secondary: 'border hover:bg-gray-50',
  };

  return (
    <Link to={href} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </Link>
  );
}
