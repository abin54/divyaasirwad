import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';

const YATRAS = [
  { id: '1', name: 'Char Dham Yatra', nameHi: 'चार धाम यात्रा', state: 'Uttarakhand', days: 12, price: 15000, rating: 4.8, image: '', highlights: ['Badrinath', 'Kedarnath', 'Gangotri', 'Yamunotri'] },
  { id: '2', name: 'Kashi Yatra', nameHi: 'काशी यात्रा', state: 'Uttar Pradesh', days: 5, price: 8500, rating: 4.7, image: '', highlights: ['Kashi Vishwanath', 'Ganga Aarti', 'Sarnath'] },
  { id: '3', name: 'Vrindavan Yatra', nameHi: 'वृंदावन यात्रा', state: 'Uttar Pradesh', days: 4, price: 6500, rating: 4.6, image: '', highlights: ['Banke Bihari', 'ISKCON', 'Govardhan'] },
  { id: '4', name: 'Jyotirlinga Yatra', nameHi: 'ज्योतिर्लिंग यात्रा', state: 'All India', days: 15, price: 25000, rating: 4.9, image: '', highlights: ['12 Jyotirlingas', 'All expenses covered'] },
  { id: '5', name: 'Rameswaram Yatra', nameHi: 'रामेश्वरम यात्रा', state: 'Tamil Nadu', days: 6, price: 9500, rating: 4.5, image: '', highlights: ['Ramanathaswamy', 'Dhanushkodi'] },
  { id: '6', name: 'Vaishno Devi Yatra', nameHi: 'वैष्णो देवी यात्रा', state: 'Jammu & Kashmir', days: 5, price: 7500, rating: 4.8, image: '', highlights: ['Mata Vaishno Devi', 'Katra'] },
];

export default function YatraListScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const renderYatra = ({ item }: any) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.cardBanner}>
        <Text style={styles.bannerEmoji}>🚌</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.yatraName}>{item.name}</Text>
        <Text style={styles.yatraNameHi}>{item.nameHi}</Text>
        <Text style={styles.yatraMeta}>📍 {item.state} • ⏱ {item.days} Days</Text>
        <View style={styles.highlightsRow}>
          {item.highlights.slice(0, 3).map((h: string, i: number) => (
            <View key={i} style={styles.highlightChip}><Text style={styles.highlightText}>{h}</Text></View>
          ))}
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.yatraPrice}>₹{item.price.toLocaleString()}/-</Text>
          <Text style={styles.yatraRating}>★ {item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pilgrimage Yatras</Text>
        <Text style={styles.headerSub}>Embark on a spiritual journey</Text>
      </View>
      <FlatList data={YATRAS} renderItem={renderYatra} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  header: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  headerTitle: { fontSize: fontSize.title, fontWeight: '800', color: colors.text },
  headerSub: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  list: { paddingHorizontal: spacing.xl, paddingBottom: 100 },
  card: { backgroundColor: colors.white, borderRadius: borderRadius.xl, marginBottom: spacing.lg, overflow: 'hidden', ...shadow.md },
  cardBanner: { height: 120, backgroundColor: colors.saffronLight, alignItems: 'center', justifyContent: 'center' },
  bannerEmoji: { fontSize: 48 },
  cardContent: { padding: spacing.lg },
  yatraName: { fontSize: fontSize.xl, fontWeight: '800', color: colors.text },
  yatraNameHi: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  yatraMeta: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.sm },
  highlightsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginTop: spacing.sm },
  highlightChip: { backgroundColor: colors.offWhite, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
  highlightText: { fontSize: fontSize.xs, color: colors.textSecondary },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.borderLight },
  yatraPrice: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.primary },
  yatraRating: { fontSize: fontSize.md, fontWeight: '700', color: colors.rating },
});
