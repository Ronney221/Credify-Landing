export const colors = {
  brand: {
    50: '#EBFCF0',
    100: '#D1F9DD',
    200: '#A3F2BB',
    300: '#75EC99',
    400: '#47E577',
    500: '#22C55E',
    600: '#1B9E4B',
    700: '#147738',
    800: '#0D4F25',
    900: '#062812',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
} as const;

export const gradients = {
  brand: {
    light: 'bg-gradient-to-br from-brand-400 to-brand-500',
    dark: 'bg-gradient-to-br from-brand-600 to-brand-700',
  },
  gray: {
    light: 'bg-gradient-to-br from-gray-50 to-gray-100',
    dark: 'bg-gradient-to-br from-gray-800 to-gray-900',
  },
  glass: {
    light: 'bg-white/90 backdrop-blur-sm',
    dark: 'bg-gray-900/90 backdrop-blur-sm',
  },
} as const;

export type ColorShade = keyof typeof colors.brand;
export type ColorGradient = keyof typeof gradients.brand;
export type GlassVariant = keyof typeof gradients.glass; 