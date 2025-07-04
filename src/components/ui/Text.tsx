import { ReactNode } from 'react';
import { TypographyVariant, getTypographyClass } from '../../lib/typography';
import { cn } from '../../lib/utils';

interface TextProps {
  variant: TypographyVariant;
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  className?: string;
}

export function Text({ variant, as: Component = 'div', children, className }: TextProps) {
  return (
    <Component className={cn(getTypographyClass(variant), className)}>
      {children}
    </Component>
  );
} 