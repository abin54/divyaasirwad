import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text as DSText } from '@divyaasirwad/design-system';

const YATRAS = [
  { id: '1', name: 'Char Dham Yatra', nameHi: 'चार धाम यात्रा', state: 'Uttarakhand', days: 12, price: 15000, rating: 4.8, highlights: ['Badrinath', 'Kedarnath', 'Gangotri', 'Yamunotri'] },
  { id: '2', name: 'Kashi Yatra', nameHi: 'काशी यात्रा', state: 'Uttar Pradesh', days: 5, price: 8500, rating: 4.7, highlights: ['Kashi Vishwanath', 'Ganga Aarti', 'Sarnath'] },
  { id: '3', name: 'Vrindavan Yatra', nameHi: 'वृंदावन यात्रा', state: 'Uttar Pradesh', days: 4, price: 6500, rating: 4.6, highlights: ['Banke Bihari', 'ISKCON', 'Govardhan'] },
  { id: '4', name: 'Jyotirlinga Yatra', nameHi: 'ज्योतिर्लिंग यात्रा', state: 'All India', days: 15, price: 25000, rating: 4.9, highlights: ['12 Jyotirlingas', 'All expenses covered'] },
];

export function YatraListScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <DSText variant="heading" weight="extrabold">Pilgrimage Yatras</DSText>
        <DSText variant="caption" color="#6B7280">Embark on a spiritual journey</DSText>
      </View>
      <FlatList data={YATRAS} renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate('YatraDetail', { slug: item.id })}>
          <View style={styles.cardBanner}><Text style={styles.bannerEmoji}>🚌</Text></View>
          <View style={styles.cardContent}>
            <DSText variant="subheading" weight="extrabold">{item.name}</DSText>
            <DSText variant="caption" color="#6B7280">{item.nameHi}</DSText>
            <DSText variant="caption" color="#6B7280">📍 {item.state} • ⏱ {item.days} Days</DSText>
            <View style={styles.highlightsRow}>
              {item.highlights.slice(0, 3).map((h: string, i: number) => (
                <View key={i} style={styles.highlightChip}><DSText variant="caption" color="#6B7280">{h}</DSText></View>
              ))}
            </View>
            <View style={styles.cardFooter}>
              <DSText variant="heading" weight="extrabold" color="#FF6F00">₹{item.price.toLocaleString()}/-</DSText>
              <DSText variant="label" weight="bold" color="#F59E00">★ {item.rating}</DSText>
            </View>
          </View>
        </TouchableOpacity>
      )} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  list: { paddingHorizontal: 16, paddingBottom: 100 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, marginBottom: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  cardBanner: { height: 120, backgroundColor: '#FFE0B2', alignItems: 'center', justifyContent: 'center' },
  bannerEmoji: { fontSize: 48 },
  cardContent: { padding: 16 },
  highlightsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 8 },
  highlightChip: { backgroundColor: '#FFFBF0', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
});
