import { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';

type IconButtonProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> & {
  Icon?: LucideIcon;
  children?: React.ReactNode;
  variant?: 'soft' | 'gradient' | 'outline' | 'ghost';
  shape?: 'pill' | 'circle';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  iconSize?: number;
};

type ViteImportMeta = ImportMeta & { env?: { DEV?: boolean } };

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ');
}

const sizeClass = {
  sm: 'h-8 text-sm',
  md: 'h-10',
  lg: 'h-11 text-base',
} as const;

const pxClass = {
  sm: 'px-3',
  md: 'px-4',
  lg: 'px-5',
} as const;

const circleWH = {
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-11',
} as const;

const variantClass = {
  soft:
    'bg-white text-gray-700 hover:shadow-md hover:text-purple-600 hover:bg-purple-50',
  gradient:
    'text-white bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg hover:shadow-xl border border-transparent',
  outline:
    'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-gray-900',
  ghost:
    'bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900',
} as const;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      Icon,
      children,
      variant = 'soft',
      shape = 'pill',
      size = 'md',
      active = false,
      iconSize,
      className,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) => {
    const isDev = !!((import.meta as ViteImportMeta).env?.DEV);
    if (!children && !ariaLabel && isDev) {
      console.warn('IconButton: provide aria-label for icon-only button.');
    }

    const isCircle = shape === 'circle';
    const base =
      'inline-flex items-center justify-center transition select-none ' +
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 ' +
      'disabled:opacity-60 disabled:cursor-not-allowed';

    const visual = active ? variantClass.gradient : variantClass[variant];

    const sizeCls = isCircle
      ? circleWH[size]
      : cn(sizeClass[size], pxClass[size], 'rounded-full');

    const iconOnly = !children;
    const _iconSize = iconSize ?? (size === 'sm' ? 16 : size === 'lg' ? 20 : 18);

    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        className={cn(base, sizeCls, 'rounded-full', visual, className)}
        {...rest}
      >
        {Icon ? (
          <Icon
            size={_iconSize}
            className={cn(!iconOnly && 'mr-2', active && 'text-white')}
          />
        ) : null}
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export { IconButton };
