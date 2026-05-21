import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padded?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export function Card({ children, variant = 'default', padded = true, style, testID }: CardProps) {
  const variantStyles: Record<string, ViewStyle> = {
    default: { backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
    elevated: { backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 12, elevation: 5 },
    outlined: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F3F4F6' },
  };

  return (
    <View style={[styles.base, variantStyles[variant], padded && { padding: 16 }, style]} testID={testID}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: 16, overflow: 'hidden' },
});
