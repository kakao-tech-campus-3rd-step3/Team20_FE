import type { ReactNode } from 'react';
export interface ButtonProps {
  href: string;
  children: ReactNode;
  variant: 'primary' | 'secondary';
  className?: string;
}
