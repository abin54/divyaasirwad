import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, spacing, shadow } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
  padded?: boolean;
}

export default function Card({ children, style, variant = 'default', padded = true }: CardProps) {
  const variantStyles: Record<string, ViewStyle> = {
    default: { backgroundColor: colors.surface, ...shadow.sm },
    elevated: { backgroundColor: colors.surface, ...shadow.lg },
    outlined: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderLight },
  };

  return (
    <View style={[styles.base, variantStyles[variant], padded && { padding: spacing.lg }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: borderRadius.xl, overflow: 'hidden' },
});
