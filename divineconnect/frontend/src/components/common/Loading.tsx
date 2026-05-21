import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors, fontSize, spacing } from '../../constants/theme';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export default function Loading({ message, fullScreen }: LoadingProps) {
  if (fullScreen) {
    return (
      <View style={styles.fullScreen}>
        <ActivityIndicator size="large" color={colors.primary} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.inline}>
      <ActivityIndicator size="small" color={colors.primary} />
      {message && <Text style={styles.inlineMessage}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.goldLight },
  message: { marginTop: spacing.lg, fontSize: fontSize.md, color: colors.textSecondary },
  inline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  inlineMessage: { marginLeft: spacing.sm, fontSize: fontSize.sm, color: colors.textSecondary },
});
