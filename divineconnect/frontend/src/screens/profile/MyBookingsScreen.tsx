import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import Card from '../../components/common/Card';

const BOOKINGS = [
  { id: 'DCABC123', ritual: 'Satyanarayan Puja', deity: 'Vishnu', date: '2024-01-15', time: '09:00 AM', status: 'confirmed', amount: 2100, temple: 'Kashi Vishwanath' },
  { id: 'DCABC124', ritual: 'Rudrabhishek', deity: 'Shiva', date: '2024-01-20', time: '07:00 AM', status: 'in_progress', amount: 3100, temple: 'Somnath Temple' },
  { id: 'DCABC125', ritual: 'Lakshmi Puja', deity: 'Lakshmi', date: '2024-01-10', time: '06:00 PM', status: 'completed', amount: 1100, temple: 'Home Puja' },
  { id: 'DCABC126', ritual: 'Navgraha Puja', deity: 'Shiva', date: '2024-02-01', time: '08:00 AM', status: 'pending', amount: 5100, temple: 'TBD' },
  { id: 'DCABC127', ritual: 'Hanuman Chalisa', deity: 'Hanuman', date: '2024-01-05', time: '06:00 AM', status: 'cancelled', amount: 500, temple: 'Hanuman Mandir' },
];

const STATUS_COLORS: Record<string, string> = { pending: colors.warning, confirmed: colors.info, in_progress: colors.primary, completed: colors.success, cancelled: colors.error };

export default function MyBookingsScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? BOOKINGS : BOOKINGS.filter((b) => b.status === filter);

  const renderBooking = ({ item }: any) => (
    <TouchableOpacity style={styles.bookingCard} onPress={() => navigation.navigate('BookingDetail', { id: item.id })} activeOpacity={0.8}>
      <View style={styles.bookingHeader}>
        <View style={styles.bookingInfo}>
          <Text style={styles.ritualName}>{item.ritual}</Text>
          <Text style={styles.bookingDeity}>{item.deity} • {item.temple}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[item.status] + '20' }]}>
          <Text style={[styles.statusText, { color: STATUS_COLORS[item.status] }]}>● {item.status.replace('_', ' ')}</Text>
        </View>
      </View>
      <View style={styles.bookingMeta}>
        <Text style={styles.metaText}>📅 {item.date}</Text>
        <Text style={styles.metaText}>⏰ {item.time}</Text>
        <Text style={styles.metaAmount}>₹{item.amount}</Text>
      </View>
      <View style={styles.bookingIdRow}>
        <Text style={styles.bookingLabel}>ID: {item.id}</Text>
        <Text style={styles.viewDetails}>View Details →</Text>
      </View>
    </TouchableOpacity>
  );

  const FILTERS = ['all', 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <Text style={styles.headerSub}>{filtered.length} booking{filtered.length !== 1 ? 's' : ''}</Text>
      </View>
      <FlatList horizontal showsHorizontalScrollIndicator={false} data={FILTERS} renderItem={({ item }) => (
        <TouchableOpacity style={[styles.filterChip, filter === item && styles.filterChipActive]} onPress={() => setFilter(item)}>
          <Text style={[styles.filterChipText, filter === item && styles.filterChipTextActive]}>{item.charAt(0).toUpperCase() + item.slice(1).replace('_', ' ')}</Text>
        </TouchableOpacity>
      )} keyExtractor={(item) => item} contentContainerStyle={styles.filterList} />
      <FlatList data={filtered} renderItem={renderBooking} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
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
  bookingCard: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md, ...shadow.sm },
  bookingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  bookingInfo: { flex: 1 },
  ritualName: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  bookingDeity: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  statusBadge: { paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.full },
  statusText: { fontSize: fontSize.xs, fontWeight: '700' },
  bookingMeta: { flexDirection: 'row', marginTop: spacing.md, gap: spacing.lg },
  metaText: { fontSize: fontSize.sm, color: colors.textSecondary },
  metaAmount: { fontSize: fontSize.sm, fontWeight: '700', color: colors.primary, marginLeft: 'auto' },
  bookingIdRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.borderLight },
  bookingLabel: { fontSize: fontSize.xs, color: colors.textLight, fontFamily: 'monospace' },
  viewDetails: { fontSize: fontSize.sm, color: colors.primary, fontWeight: '600' },
});
