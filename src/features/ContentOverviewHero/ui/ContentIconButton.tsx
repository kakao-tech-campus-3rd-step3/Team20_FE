import type { ContentIconButtonProps } from '../model/types';

export function ContentIconButton({
  icon: Icon,
  iconClassName = '',
  variant = 'default',
  size = 'md',
  className = '',
  onClick,
}: ContentIconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      <Icon className={`${iconSizeClasses[size]} text-white ${iconClassName}`} />
    </button>
  );
}

const baseClasses = 'backdrop-blur-sm rounded-full transition-colors';

const variantClasses = {
  default: 'bg-black/30 hover:bg-black/50',
  transparent: 'bg-transparent hover:bg-black/20',
};

const sizeClasses = {
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-3',
};

const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};
