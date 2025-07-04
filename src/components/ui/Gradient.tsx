import { ReactNode } from 'react';
import { gradients } from '../../lib/colors';
import { cn } from '../../lib/utils';

interface GradientProps {
  variant: keyof typeof gradients;
  type: 'light' | 'dark';
  children: ReactNode;
  className?: string;
}

export function Gradient({ variant, type, children, className }: GradientProps) {
  return (
    <div className={cn(gradients[variant][type], className)}>
      {children}
    </div>
  );
}

interface GlassProps {
  variant: 'light' | 'dark';
  children: ReactNode;
  className?: string;
}

export function Glass({ variant, children, className }: GlassProps) {
  return (
    <div className={cn(gradients.glass[variant], className)}>
      {children}
    </div>
  );
} 