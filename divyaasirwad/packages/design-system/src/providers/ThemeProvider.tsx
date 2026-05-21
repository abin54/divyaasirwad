import React, { createContext, useContext, useMemo } from 'react';
import { colors, spacing, fontSize, fontWeight, borderRadius, shadows, lineHeight } from '../tokens';

export interface ThemeConfig {
  colors: typeof colors;
  spacing: typeof spacing;
  fontSize: typeof fontSize;
  fontWeight: typeof fontWeight;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  lineHeight: typeof lineHeight;
}

export const defaultTheme: ThemeConfig = {
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
  shadows,
  lineHeight,
};

const ThemeContext = createContext<ThemeConfig>(defaultTheme);

export const ThemeProvider: React.FC<{ theme?: Partial<ThemeConfig>; children: React.ReactNode }> = ({ theme, children }) => {
  const value = useMemo(() => ({ ...defaultTheme, ...theme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeConfig => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export type SpacingValue = keyof typeof spacing;
export type ColorValue = string;
export type FontSizeValue = keyof typeof fontSize;
