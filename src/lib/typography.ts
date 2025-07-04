export const typography = {
  h1: 'font-display text-5xl lg:text-6xl font-bold leading-tight',
  h2: 'font-display text-4xl lg:text-5xl font-bold leading-tight',
  h3: 'font-display text-3xl lg:text-4xl font-bold leading-tight',
  h4: 'font-display text-2xl lg:text-3xl font-bold leading-tight',
  h5: 'font-display text-xl lg:text-2xl font-bold leading-tight',
  subtitle: 'text-xl text-gray-600 leading-relaxed',
  body: 'text-base text-gray-600 leading-relaxed',
  small: 'text-sm text-gray-500 leading-relaxed',
  tiny: 'text-xs text-gray-400 leading-relaxed',
} as const;

export type TypographyVariant = keyof typeof typography;

export function getTypographyClass(variant: TypographyVariant): string {
  return typography[variant];
} 