import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from './cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
  }
>;

function variantClasses(variant: Variant): string {
  switch (variant) {
    case 'primary':
      return 'bg-primary text-primary-foreground hover:bg-black';
    case 'secondary':
      return 'bg-white text-gray-900 border hover:bg-gray-50';
    case 'ghost':
      return 'bg-transparent text-gray-900 hover:bg-gray-100 border';
    default:
      return '';
  }
}

function sizeClasses(size: Size): string {
  switch (size) {
    case 'sm':
      return 'px-3 py-1.5 text-sm';
    case 'md':
    default:
      return 'px-3.5 py-2 text-sm';
  }
}

export default function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-800 transition-colors',
        variantClasses(variant),
        sizeClasses(size),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}