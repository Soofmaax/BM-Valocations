import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from './cn';
import type { VehicleCategory } from '../../types';

type Variant = 'neutral' | 'success' | 'warning';
type CategoryVariant = Extract<VehicleCategory, 'economy' | 'premium' | 'suv' | 'van'>;

function variantClasses(variant: Variant): string {
  switch (variant) {
    case 'success':
      return 'bg-emerald-100 text-emerald-800';
    case 'warning':
      return 'bg-amber-100 text-amber-800';
    case 'neutral':
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function categoryToVariant(category: CategoryVariant): Variant {
  switch (category) {
    case 'premium':
      return 'warning';
    case 'economy':
      return 'success';
    case 'suv':
    case 'van':
    default:
      return 'neutral';
  }
}

export function Badge({
  className,
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span
      className={cn('inline-block text-xs px-2 py-1 rounded', className)}
      {...props}
    >
      {children}
    </span>
  );
}

export function CategoryBadge({
  category,
  className,
  ...props
}: { category: CategoryVariant } & Omit<HTMLAttributes<HTMLSpanElement>, 'children'>) {
  const variant = categoryToVariant(category);
  return (
    <Badge className={cn(variantClasses(variant), className)} {...props}>
      {category}
    </Badge>
  );
}