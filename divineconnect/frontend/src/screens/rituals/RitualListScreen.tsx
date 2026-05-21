import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import { RITUALS, PUJA_CATEGORIES } from '../../constants/rituals';

export default function RitualListScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = selectedCategory === 'all' ? RITUALS : RITUALS.filter((r) => r.category === selectedCategory);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}><Text style={styles.headerTitle}>Pujas & Rituals</Text><Text style={styles.headerSub}>Choose a sacred ritual</Text></View>
      <FlatList horizontal showsHorizontalScrollIndicator={false} data={[{ id: 'all', label: 'All' }, ...PUJA_CATEGORIES]} renderItem={({ item }) => (
        <TouchableOpacity style={[styles.filterChip, selectedCategory === item.id && styles.filterChipActive]} onPress={() => setSelectedCategory(item.id)}>
          <Text style={[styles.filterChipText, selectedCategory === item.id && styles.filterChipTextActive]}>{item.label}</Text>
        </TouchableOpacity>
      )} keyExtractor={(item) => item.id} contentContainerStyle={styles.filterList} />
      <FlatList data={filtered} renderItem={({ item }) => (
        <TouchableOpacity style={styles.ritualCard} onPress={() => navigation.navigate('RitualDetail', { slug: item.id })} activeOpacity={0.8}>
          <View style={styles.ritualIconContainer}><Text style={styles.ritualIcon}>{item.icon}</Text></View>
          <View style={styles.ritualInfo}>
            <Text style={styles.ritualName}>{item.name}</Text>
            <Text style={styles.ritualMeta}>⏱ {item.duration.basic}-{item.duration.premium} min • {item.deity}</Text>
            <Text style={styles.ritualDesc} numberOfLines={1}>{item.description}</Text>
          </View>
          <View style={styles.priceSection}>
            <Text style={styles.priceValue}>₹{item.price.basic}</Text>
            <Text style={styles.priceLabel}>starting</Text>
          </View>
        </TouchableOpacity>
      )} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  header: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  headerTitle: { fontSize: fontSize.title, fontWeight: '800', color: colors.text },
  headerSub: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  filterList: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  filterChip: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.full, backgroundColor: colors.white, marginRight: spacing.sm, ...shadow.sm },
  filterChipActive: { backgroundColor: colors.primary },
  filterChipText: { fontSize: fontSize.sm, color: colors.text, fontWeight: '600' },
  filterChipTextActive: { color: colors.white },
  list: { paddingHorizontal: spacing.xl, paddingBottom: 100 },
  ritualCard: { flexDirection: 'row', backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md, ...shadow.sm },
  ritualIconContainer: { width: 48, height: 48, borderRadius: 16, backgroundColor: colors.saffronLight, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  ritualIcon: { fontSize: 24 },
  ritualInfo: { flex: 1, marginRight: spacing.sm },
  ritualName: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  ritualMeta: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
  ritualDesc: { fontSize: fontSize.sm, color: colors.textLight, marginTop: 4 },
  priceSection: { alignItems: 'flex-end', justifyContent: 'center' },
  priceValue: { fontSize: fontSize.xl, fontWeight: '800', color: colors.primary },
  priceLabel: { fontSize: fontSize.xs, color: colors.textSecondary },
});
