import { forwardRef } from 'react';
import type { IconButtonProps } from '@/features/Header/model/types';
import {
  cn,
  sizeClass,
  pxClass,
  circleWH,
  variantClass,
  iconSizeByControl,
} from '@/features/Header/model/utils';

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
      'inline-flex items-center justify-center rounded-full transition select-none ' +
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 ' +
      'disabled:opacity-60 disabled:cursor-not-allowed';

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
