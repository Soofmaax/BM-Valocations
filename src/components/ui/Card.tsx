import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from './cn';

export function Card({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn('bg-surface border rounded-brand p-4 shadow-sm', className)}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn('mb-2', className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h3 className={cn('font-semibold text-gray-900', className)} {...props} />
  );
}

export function CardContent({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn('text-sm text-gray-700', className)} {...props} />;
}