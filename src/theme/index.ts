export const colors = {
  bg: '#FFF4E4',
  bgDeep: '#FBE3C4',
  ink: '#2D2342',
  inkSoft: '#6B5F80',
  white: '#FFFFFF',
  coral: '#FF6B57',
  coralDark: '#D94A38',
  mint: '#2FCB95',
  mintDark: '#1E9C71',
  sun: '#FFC53D',
  sunDark: '#E09B12',
  sky: '#4DA3FF',
  skyDark: '#2B7BD6',
  plum: '#5B3F8C',
  plumDark: '#3F2A66',
  locked: '#D9CFC2',
  lockedDark: '#B5A998',
};

export const fonts = {
  medium: 'Fredoka_500Medium',
  semibold: 'Fredoka_600SemiBold',
  bold: 'Fredoka_700Bold',
};

export const radius = { sm: 10, md: 16, lg: 24, pill: 999 };

export function shade(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * 0.78);
  const g = Math.round(((n >> 8) & 255) * 0.78);
  const b = Math.round((n & 255) * 0.78);
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}
