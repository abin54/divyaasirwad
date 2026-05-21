import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, fontSize, shadow } from '../../constants/theme';

interface Props {
  name: string;
  deity: string;
  price: number;
  duration: number;
  icon: string;
  onPress: () => void;
}

export default function TrendingPujaCard({ name, deity, price, duration, icon, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.8}>
      <View style={[styles.iconContainer, { backgroundColor: colors.saffronLight }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.deity}>{deity}</Text>
        <Text style={styles.duration}>⏱ {duration} min</Text>
      </View>
      <View style={styles.priceSection}>
        <Text style={styles.price}>₹{price}</Text>
        <Text style={styles.starting}>starting</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.sm, ...shadow.sm },
  iconContainer: { width: 48, height: 48, borderRadius: borderRadius.full, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  icon: { fontSize: 24 },
  info: { flex: 1 },
  name: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  deity: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  duration: { fontSize: fontSize.xs, color: colors.textLight, marginTop: 2 },
  priceSection: { alignItems: 'flex-end' },
  price: { fontSize: fontSize.xl, fontWeight: '800', color: colors.primary },
  starting: { fontSize: fontSize.xs, color: colors.textLight },
});
