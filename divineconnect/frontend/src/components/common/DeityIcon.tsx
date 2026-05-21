import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { borderRadius, spacing, fontSize } from '../../constants/theme';

interface DeityIconProps {
  icon: string;
  name: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
}

export default function DeityIcon({ icon, name, color = '#FFF3E0', size = 'md' }: DeityIconProps) {
  const sizes = {
    sm: { container: 48, icon: 22, name: fontSize.xs },
    md: { container: 64, icon: 28, name: fontSize.sm },
    lg: { container: 80, icon: 36, name: fontSize.md },
  };

  const s = sizes[size];

  return (
    <View style={[styles.container, { width: s.container, height: s.container, backgroundColor: color }]}>
      <Text style={{ fontSize: s.icon }}>{icon}</Text>
      <Text style={[styles.name, { fontSize: s.name }]} numberOfLines={1}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', borderRadius: borderRadius.lg },
  name: { fontWeight: '600', color: '#1A1A1A', marginTop: 2, textAlign: 'center' },
});
