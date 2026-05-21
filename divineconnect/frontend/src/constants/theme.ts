export const colors = {
  primary: '#FF6F00',
  primaryDark: '#E65100',
  primaryLight: '#FFB300',
  saffron: '#FF9933',
  saffronLight: '#FFE0B2',
  gold: '#FFD700',
  goldLight: '#FFF8E1',
  white: '#FFFFFF',
  offWhite: '#FFFBF0',
  background: '#FFFBF0',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  success: '#059669',
  error: '#DC2626',
  warning: '#F59E0B',
  info: '#2563EB',
  overlay: 'rgba(0,0,0,0.5)',
  shadow: 'rgba(0,0,0,0.1)',
  tabInactive: '#9CA3AF',
  rating: '#F59E0B',
  priest: '#FF6F00',
  temple: '#8B4513',
  dark: '#1A1A1A',
  whiteSmoke: '#F5F5F5',
  deepSaffron: '#B8860B',
  chakra: '#000080',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  title: 28,
  hero: 32,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 999,
};

export const typography = {
  heading: {
    fontFamily: 'System',
    fontWeight: '700' as const,
    letterSpacing: 0.5,
  },
  subheading: {
    fontFamily: 'System',
    fontWeight: '600' as const,
  },
  body: {
    fontFamily: 'System',
    fontWeight: '400' as const,
  },
};

export const shadow = {
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 5 },
};
