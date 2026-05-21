import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: React.ReactNode;
  containerStyle?: any;
}

export default function Input({ label, error, leftIcon, rightIcon, containerStyle, style, ...props }: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError, !error && shadow.sm]}>
        {leftIcon && <Text style={styles.leftIcon}>{leftIcon}</Text>}
        <TextInput
          style={[styles.input, leftIcon && styles.inputWithIcon, style]}
          placeholderTextColor={colors.textLight}
          {...props}
        />
        {rightIcon}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.lg },
  label: { fontSize: fontSize.sm, fontWeight: '600', color: colors.text, marginBottom: spacing.xs },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: borderRadius.lg, paddingHorizontal: spacing.lg, height: 52, borderWidth: 1.5, borderColor: colors.borderLight },
  inputError: { borderColor: colors.error },
  leftIcon: { fontSize: 18, marginRight: spacing.sm },
  input: { flex: 1, fontSize: fontSize.md, color: colors.text },
  inputWithIcon: { marginLeft: 0 },
  errorText: { fontSize: fontSize.xs, color: colors.error, marginTop: spacing.xs },
});
