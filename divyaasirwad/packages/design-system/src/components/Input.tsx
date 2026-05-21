import React, { forwardRef } from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet, ViewStyle, TextStyle } from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, containerStyle, style, ...props }, ref) => {
    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={[styles.inputContainer, error && styles.inputError, !error && styles.inputDefault]}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <TextInput
            ref={ref}
            style={[styles.input, leftIcon && styles.inputWithLeftIcon, rightIcon && styles.inputWithRightIcon, style]}
            placeholderTextColor="#9CA3AF"
            {...props}
          />
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {helperText && !error && <Text style={styles.helperText}>{helperText}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#1A1A1A', marginBottom: 4 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1.5,
  },
  inputDefault: { borderColor: '#E5E7EB' },
  inputError: { borderColor: '#DC2626' },
  input: { flex: 1, fontSize: 16, color: '#1A1A1A', paddingVertical: 0 },
  inputWithLeftIcon: { marginLeft: 0 },
  inputWithRightIcon: { marginRight: 0 },
  leftIcon: { marginRight: 12, alignItems: 'center', justifyContent: 'center' },
  rightIcon: { marginLeft: 12, alignItems: 'center', justifyContent: 'center' },
  errorText: { fontSize: 12, color: '#DC2626', marginTop: 4 },
  helperText: { fontSize: 12, color: '#6B7280', marginTop: 4 },
});
