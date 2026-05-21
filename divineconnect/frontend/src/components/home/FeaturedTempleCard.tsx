import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, fontSize, shadow } from '../../constants/theme';

interface Props {
  name: string;
  location: string;
  image: string;
  rating: number;
  deity: string;
  onPress: () => void;
}

export default function FeaturedTempleCard({ name, location, image, rating, deity, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.9}>
      <Image source={{ uri: image || 'https://via.placeholder.com/300x200/FFE0B2/FF6F00?text=Mandir' }} style={styles.image} />
      <View style={styles.overlay}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>★ {rating.toFixed(1)}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.location} numberOfLines={1}>{location}</Text>
        <View style={styles.bottomRow}>
          <View style={styles.deityBadge}>
            <Text style={styles.deityText}>{deity}</Text>
          </View>
          <Text style={styles.bookText}>Book →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { width: 240, marginRight: spacing.md, borderRadius: borderRadius.xl, overflow: 'hidden', backgroundColor: colors.white, ...shadow.md },
  image: { width: '100%', height: 140, resizeMode: 'cover' },
  overlay: { position: 'absolute', top: spacing.sm, right: spacing.sm },
  badge: { backgroundColor: colors.gold, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.full },
  badgeText: { fontSize: fontSize.xs, fontWeight: '700', color: colors.dark },
  infoContainer: { padding: spacing.md },
  name: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text },
  location: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.sm },
  deityBadge: { backgroundColor: colors.saffronLight, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
  deityText: { fontSize: fontSize.xs, color: colors.primary, fontWeight: '600' },
  bookText: { fontSize: fontSize.sm, color: colors.primary, fontWeight: '600' },
});
