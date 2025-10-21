import { forwardRef } from 'react';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  variant?: 'primary' | 'secondary' | 'disabled';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const FormButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'lg',
      isLoading = false,
      className = '',
      style,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      'w-full flex justify-center border border-transparent rounded-2xl shadow-lg font-bold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-offset-2';

    const variantClasses = {
      primary:
        'text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 focus:ring-purple-300 shadow-lg',
      secondary: 'text-gray-600 bg-gray-100 hover:bg-gray-200 focus:ring-gray-300',
      disabled: 'text-gray-400 bg-gray-200 cursor-not-allowed shadow-sm',
    };

    const sizeClasses = {
      sm: 'py-3 px-6 text-base',
      md: 'py-4 px-7 text-lg',
      lg: 'py-5 px-8 text-xl',
    };

    const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    const buttonStyle = {
      fontFamily: 'Fredoka, sans-serif',
      ...style,
    };

    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={buttonClasses}
        style={buttonStyle}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            처리 중...
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);

FormButton.displayName = 'FormButton';
