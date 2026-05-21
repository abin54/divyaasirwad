import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { borderRadius, spacing, fontSize, shadow } from '../../constants/theme';

interface FestivalOfferCardProps {
  title: string;
  subtitle: string;
  discount?: string;
  colors?: [string, string];
  onPress: () => void;
}

export default function FestivalOfferCard({ title, subtitle, discount, colors: gradientColors = ['#FFE0B2', '#FFCC80'], onPress }: FestivalOfferCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <LinearGradient colors={gradientColors} style={styles.container} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          {discount && <View style={styles.discountBadge}><Text style={styles.discountText}>{discount}</Text></View>}
        </View>
        <Text style={styles.cta}>Book Now →</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { width: 200, borderRadius: borderRadius.xl, padding: spacing.lg, marginRight: spacing.md, ...shadow.md },
  content: { flex: 1 },
  title: { fontSize: fontSize.lg, fontWeight: '800', color: '#1A1A1A' },
  subtitle: { fontSize: fontSize.sm, color: '#666', marginTop: 4 },
  discountBadge: { backgroundColor: '#FF6F00', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm, alignSelf: 'flex-start', marginTop: spacing.sm },
  discountText: { fontSize: fontSize.xs, fontWeight: '700', color: '#fff' },
  cta: { fontSize: fontSize.sm, fontWeight: '700', color: '#E65100', marginTop: spacing.md },
});
