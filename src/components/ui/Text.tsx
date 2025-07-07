import React from "react";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const textVariants = cva("font-sans", { // Default to Inter
  variants: {
    variant: {
      h1: "font-heading text-5xl font-bold tracking-tight",
      h2: "font-heading text-4xl font-bold tracking-tight",
      h3: "font-heading text-3xl font-bold tracking-tight",
      h4: "font-heading text-2xl font-bold tracking-tight",
      subtitle: "text-xl text-gray-500",
      body: "text-base",
      caption: "text-sm text-gray-600",
      tiny: "text-xs text-gray-500",
    },
  },
});

interface TextProps extends VariantProps<typeof textVariants> {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export function Text({
  variant,
  as: Component = "div",
  children,
  className,
}: TextProps) {
  return (
    <Component className={cn(textVariants({ variant }), className)}>
      {children}
    </Component>
  );
} 