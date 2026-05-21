import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import Button from '../../components/common/Button';

export default function TempleDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const { slug } = route.params;

  const temple = {
    name: 'Shri Kashi Vishwanath Temple',
    nameHi: 'श्री काशी विश्वनाथ मंदिर',
    location: 'Varanasi, Uttar Pradesh',
    rating: 4.8,
    reviews: 12453,
    description: 'One of the most famous Hindu temples dedicated to Lord Shiva, located in the holy city of Varanasi. The temple stands on the western bank of the holy river Ganges and is one of the twelve Jyotirlingas.',
    timings: '4:00 AM - 11:00 PM',
    aartiTimings: [
      { name: 'Mangala Aarti', time: '4:00 AM' },
      { name: 'Bhoga Aarti', time: '12:00 PM' },
      { name: 'Sandhya Aarti', time: '7:00 PM' },
      { name: 'Shayan Aarti', time: '10:30 PM' },
    ],
    deity: 'Shiva',
    type: 'Jyotirlinga',
    builtBy: 'Maharani Ahilyabai Holkar',
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView>
        <View style={styles.banner}>
          <Text style={styles.bannerEmoji}>🛕</Text>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{temple.name}</Text>
              <Text style={styles.nameHi}>{temple.nameHi}</Text>
              <Text style={styles.location}>📍 {temple.location}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>★ {temple.rating}</Text>
              <Text style={styles.reviewCount}>{temple.reviews.toLocaleString()} reviews</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}><Text style={styles.infoLabel}>Deity</Text><Text style={styles.infoValue}>{temple.deity}</Text></View>
            <View style={styles.infoItem}><Text style={styles.infoLabel}>Type</Text><Text style={styles.infoValue}>{temple.type}</Text></View>
            <View style={styles.infoItem}><Text style={styles.infoLabel}>Timings</Text><Text style={styles.infoValue}>{temple.timings}</Text></View>
          </View>

          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{temple.description}</Text>

          <Text style={styles.sectionTitle}>Aarti Timings</Text>
          {temple.aartiTimings.map((aarti, i) => (
            <View key={i} style={styles.aartiRow}>
              <Text style={styles.aartiName}>🪔 {aarti.name}</Text>
              <Text style={styles.aartiTime}>{aarti.time}</Text>
            </View>
          ))}

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Puja starting from</Text>
          <Text style={styles.priceValue}>₹1,100</Text>
        </View>
        <Button title="Book Puja at Temple" onPress={() => navigation.navigate('SelectRitual', { templeId: slug })} size="sm" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  banner: { height: 220, backgroundColor: colors.saffronLight, alignItems: 'center', justifyContent: 'center' },
  bannerEmoji: { fontSize: 80 },
  backBtn: { position: 'absolute', top: spacing.lg, left: spacing.lg, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 24, color: colors.white },
  content: { padding: spacing.xl },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  name: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.text },
  nameHi: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  location: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs },
  ratingBadge: { backgroundColor: colors.goldLight, padding: spacing.sm, borderRadius: borderRadius.lg, alignItems: 'center', minWidth: 80 },
  ratingText: { fontSize: fontSize.lg, fontWeight: '800', color: colors.primary },
  reviewCount: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
  infoRow: { flexDirection: 'row', backgroundColor: colors.offWhite, borderRadius: borderRadius.lg, padding: spacing.lg, marginTop: spacing.lg, justifyContent: 'space-between' },
  infoItem: { alignItems: 'center' },
  infoLabel: { fontSize: fontSize.xs, color: colors.textSecondary },
  infoValue: { fontSize: fontSize.sm, fontWeight: '700', color: colors.text, marginTop: 2 },
  sectionTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text, marginTop: spacing.xxl, marginBottom: spacing.md },
  description: { fontSize: fontSize.md, color: colors.textSecondary, lineHeight: 24 },
  aartiRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  aartiName: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  aartiTime: { fontSize: fontSize.md, color: colors.primary, fontWeight: '700' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.white, padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.borderLight, ...shadow.lg },
  priceContainer: {},
  priceLabel: { fontSize: fontSize.xs, color: colors.textSecondary },
  priceValue: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.primary },
});
