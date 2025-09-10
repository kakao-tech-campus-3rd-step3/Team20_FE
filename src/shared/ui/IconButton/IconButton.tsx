import { forwardRef } from 'react';
import type { IconButtonProps } from '../../model/types';
import { cn } from '../../model/utils';
import { sizeClass, pxClass, circleWH, variantClass, iconSizeByControl } from '../../model/styles';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
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
    ref,
  ) => {
    const base =
      'inline-flex items-center justify-center rounded-full transition-all duration-200 select-none ' +
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 ' +
      'disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95';

    const visual = active ? variantClass.gradient : variantClass[variant];
    const sizeCls = shape === 'circle' ? circleWH[size] : cn(sizeClass[size], pxClass[size]);
    const resolvedIconSize = iconSize ?? iconSizeByControl[size];

    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        className={cn(base, sizeCls, visual, className)}
        {...rest}
      >
        <Icon
          size={resolvedIconSize}
          className={cn(children ? 'mr-2' : undefined, active ? 'text-white' : undefined)}
        />
        {children}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
