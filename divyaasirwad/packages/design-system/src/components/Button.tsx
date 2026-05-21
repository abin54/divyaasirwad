import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle, View } from 'react-native';
import { useTheme, SpacingValue } from '../providers/ThemeProvider';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps {
  children?: React.ReactNode;
  title?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
  accessibilityLabel?: string;
}

const variantStyles: Record<ButtonVariant, { container: ViewStyle; text: TextStyle }> = {
  primary: {
    container: { backgroundColor: '#FF6F00' },
    text: { color: '#FFFFFF' },
  },
  secondary: {
    container: { backgroundColor: '#FFE0B2' },
    text: { color: '#E65100' },
  },
  outline: {
    container: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: '#FF6F00' },
    text: { color: '#FF6F00' },
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    text: { color: '#FF6F00' },
  },
  danger: {
    container: { backgroundColor: '#DC2626' },
    text: { color: '#FFFFFF' },
  },
};

const sizeStyles: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
  xs: { container: { paddingVertical: 4, paddingHorizontal: 8 }, text: { fontSize: 10 } },
  sm: { container: { paddingVertical: 8, paddingHorizontal: 12 }, text: { fontSize: 12 } },
  md: { container: { paddingVertical: 12, paddingHorizontal: 16 }, text: { fontSize: 14 } },
  lg: { container: { paddingVertical: 16, paddingHorizontal: 24 }, text: { fontSize: 16 } },
  xl: { container: { paddingVertical: 20, paddingHorizontal: 32 }, text: { fontSize: 18 } },
};

export function Button({
  children,
  title,
  onPress,
  variant = 'primary',
  size = 'lg',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  testID,
  accessibilityLabel,
}: ButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.base,
        variantStyles[variant].container,
        sizeStyles[size].container,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.8}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#FF6F00' : '#FFFFFF'} size="small" />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
          <Text style={[styles.text, variantStyles[variant].text, sizeStyles[size].text, textStyle]}>{title || children}</Text>
          {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.5 },
  content: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  text: { fontWeight: '700', textAlign: 'center' },
  icon: { alignItems: 'center', justifyContent: 'center' },
});
