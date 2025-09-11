import { cn } from '@/shared/lib/cn';

interface TestButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function TestButton({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  className,
}: TestButtonProps) {
  const baseClasses =
    'rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-brand-primary text-white hover:bg-brand-tertiary focus:ring-brand-primary',
    secondary: 'bg-brand-secondary text-white hover:bg-brand-tertiary focus:ring-brand-secondary',
    success: 'bg-semantic-success text-white hover:opacity-90 focus:ring-semantic-success',
    warning: 'bg-semantic-warning text-white hover:opacity-90 focus:ring-semantic-warning',
    error: 'bg-semantic-error text-white hover:opacity-90 focus:ring-semantic-error',
    info: 'bg-semantic-info text-white hover:opacity-90 focus:ring-semantic-info',
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-button',
    medium: 'px-4 py-2 text-button',
    large: 'px-6 py-3 text-button-large',
  };

  return (
    <button
      onClick={onClick}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
    >
      {children}
    </button>
  );
}
