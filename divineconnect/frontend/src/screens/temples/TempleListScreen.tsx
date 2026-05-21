import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';

const MOCK_TEMPLES = [
  { id: '1', name: 'Shri Kashi Vishwanath Temple', city: 'Varanasi', state: 'Uttar Pradesh', image: '', rating: 4.8, deity: 'Shiva', distance: '2.5 km' },
  { id: '2', name: 'Shri Ram Janmabhoomi', city: 'Ayodhya', state: 'Uttar Pradesh', image: '', rating: 4.9, deity: 'Ram', distance: '12 km' },
  { id: '3', name: 'Banke Bihari Temple', city: 'Vrindavan', state: 'Uttar Pradesh', image: '', rating: 4.7, deity: 'Krishna', distance: '5 km' },
  { id: '4', name: 'Dakshineswar Kali Temple', city: 'Kolkata', state: 'West Bengal', image: '', rating: 4.6, deity: 'Kali', distance: '3 km' },
  { id: '5', name: 'Siddhivinayak Temple', city: 'Mumbai', state: 'Maharashtra', image: '', rating: 4.8, deity: 'Ganesh', distance: '1.5 km' },
  { id: '6', name: 'Meenakshi Amman Temple', city: 'Madurai', state: 'Tamil Nadu', image: '', rating: 4.9, deity: 'Durga', distance: '8 km' },
  { id: '7', name: 'Jagannath Temple', city: 'Puri', state: 'Odisha', image: '', rating: 4.8, deity: 'Vishnu', distance: '0 km' },
  { id: '8', name: 'Iskcon Temple', city: 'Delhi', state: 'Delhi', image: '', rating: 4.5, deity: 'Krishna', distance: '4 km' },
];

const DEITIES_FILTER = ['All', 'Shiva', 'Krishna', 'Durga', 'Hanuman', 'Lakshmi', 'Kali', 'Ram', 'Ganesh'];

export default function TempleListScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [activeDeity, setActiveDeity] = useState('All');

  const filtered = MOCK_TEMPLES.filter((t) => {
    if (activeDeity !== 'All' && t.deity !== activeDeity) return false;
    if (search) {
      const q = search.toLowerCase();
      return t.name.toLowerCase().includes(q) || t.city.toLowerCase().includes(q) || t.state.toLowerCase().includes(q);
    }
    return true;
  });

  const renderTemple = ({ item }: any) => (
    <TouchableOpacity style={styles.templeCard} onPress={() => navigation.navigate('TempleDetail', { slug: item.id })} activeOpacity={0.8}>
      <View style={styles.templeImageContainer}>
        <Text style={styles.templeEmoji}>🛕</Text>
      </View>
      <View style={styles.templeInfo}>
        <Text style={styles.templeName}>{item.name}</Text>
        <Text style={styles.templeLocation}>{item.city}, {item.state}</Text>
        <View style={styles.templeMeta}>
          <View style={styles.deityBadge}><Text style={styles.deityBadgeText}>{item.deity}</Text></View>
          <Text style={styles.rating}>★ {item.rating}</Text>
          <Text style={styles.distance}>📍 {item.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Temples</Text>
        <Text style={styles.headerSub}>Discover divine places</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by temple, city, or state..."
          placeholderTextColor={colors.textLight}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        horizontal showsHorizontalScrollIndicator={false}
        data={DEITIES_FILTER}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.filterChip, activeDeity === item && styles.filterChipActive]}
            onPress={() => setActiveDeity(item)}
          >
            <Text style={[styles.filterChipText, activeDeity === item && styles.filterChipTextActive]}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.filterList}
      />
      <FlatList
        data={filtered}
        renderItem={renderTemple}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  header: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  headerTitle: { fontSize: fontSize.title, fontWeight: '800', color: colors.text },
  headerSub: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  searchContainer: { paddingHorizontal: spacing.xl, marginBottom: spacing.md },
  searchInput: { backgroundColor: colors.white, borderRadius: borderRadius.lg, paddingHorizontal: spacing.lg, height: 44, fontSize: fontSize.md, color: colors.text, ...shadow.sm },
  filterList: { paddingHorizontal: spacing.xl, marginBottom: spacing.md },
  filterChip: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.full, backgroundColor: colors.white, marginRight: spacing.sm, ...shadow.sm },
  filterChipActive: { backgroundColor: colors.primary },
  filterChipText: { fontSize: fontSize.sm, color: colors.text, fontWeight: '600' },
  filterChipTextActive: { color: colors.white },
  listContent: { paddingHorizontal: spacing.xl, paddingBottom: 100 },
  templeCard: { flexDirection: 'row', backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md, ...shadow.sm },
  templeImageContainer: { width: 60, height: 60, borderRadius: borderRadius.md, backgroundColor: colors.saffronLight, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  templeEmoji: { fontSize: 28 },
  templeInfo: { flex: 1 },
  templeName: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  templeLocation: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  templeMeta: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm, gap: spacing.md },
  deityBadge: { backgroundColor: colors.saffronLight, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
  deityBadgeText: { fontSize: fontSize.xs, color: colors.primary, fontWeight: '600' },
  rating: { fontSize: fontSize.sm, color: colors.rating, fontWeight: '600' },
  distance: { fontSize: fontSize.sm, color: colors.textSecondary },
});
