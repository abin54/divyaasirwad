import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet, TextStyle } from 'react-native';

export interface TextProps extends RNTextProps {
  variant?: 'heading' | 'subheading' | 'body' | 'caption' | 'label' | 'display';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: string;
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
}

const variantStyles: Record<string, TextStyle> = {
  display: { fontSize: 32, lineHeight: 40 },
  heading: { fontSize: 24, lineHeight: 32 },
  subheading: { fontSize: 20, lineHeight: 28 },
  body: { fontSize: 16, lineHeight: 24 },
  label: { fontSize: 14, lineHeight: 20 },
  caption: { fontSize: 12, lineHeight: 16 },
};

const weightStyles: Record<string, TextStyle> = {
  normal: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  semibold: { fontWeight: '600' },
  bold: { fontWeight: '700' },
  extrabold: { fontWeight: '800' },
};

export function Text({ variant = 'body', weight = 'normal', color, align, style, numberOfLines, ...props }: TextProps) {
  return (
    <RNText
      style={[variantStyles[variant], weightStyles[weight], color ? { color } : undefined, align ? { textAlign: align } : undefined, style]}
      numberOfLines={numberOfLines}
      {...props}
    />
  );
}
