import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text as DSText, Card } from '@divyaasirwad/design-system';

const BOOKINGS = [
  { id: 'DCABC123', ritual: 'Satyanarayan Puja', deity: 'Vishnu', date: '2024-01-15', time: '09:00 AM', status: 'confirmed', amount: 2100, temple: 'Kashi Vishwanath' },
  { id: 'DCABC124', ritual: 'Rudrabhishek', deity: 'Shiva', date: '2024-01-20', time: '07:00 AM', status: 'in_progress', amount: 3100, temple: 'Somnath Temple' },
  { id: 'DCABC125', ritual: 'Lakshmi Puja', deity: 'Lakshmi', date: '2024-01-10', time: '06:00 PM', status: 'completed', amount: 1100, temple: 'Home Puja' },
  { id: 'DCABC126', ritual: 'Navgraha Puja', deity: 'Shiva', date: '2024-02-01', time: '08:00 AM', status: 'pending', amount: 5100, temple: 'TBD' },
  { id: 'DCABC127', ritual: 'Hanuman Chalisa', deity: 'Hanuman', date: '2024-01-05', time: '06:00 AM', status: 'cancelled', amount: 500, temple: 'Hanuman Mandir' },
];

const STATUS_COLORS: Record<string, string> = { pending: '#F59E0B', confirmed: '#2563EB', in_progress: '#FF6F00', completed: '#059669', cancelled: '#DC2626' };

export function MyBookingsScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? BOOKINGS : BOOKINGS.filter((b) => b.status === filter);
  const FILTERS = ['all', 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <DSText variant="heading" weight="extrabold">My Bookings</DSText>
        <DSText variant="caption" color="#6B7280">{filtered.length} booking{filtered.length !== 1 ? 's' : ''}</DSText>
      </View>
      <FlatList horizontal showsHorizontalScrollIndicator={false} data={FILTERS} renderItem={({ item }) => (
        <TouchableOpacity style={[styles.filterChip, filter === item && styles.filterChipActive]} onPress={() => setFilter(item)}>
          <DSText variant="caption" weight="semibold" color={filter === item ? '#FFFFFF' : '#1A1A1A'}>{item.charAt(0).toUpperCase() + item.slice(1).replace('_', ' ')}</DSText>
        </TouchableOpacity>
      )} keyExtractor={(item) => item} contentContainerStyle={styles.filterList} />
      <FlatList data={filtered} renderItem={({ item }) => (
        <TouchableOpacity style={styles.bookingCard} onPress={() => navigation.navigate('BookingDetail', { id: item.id })} activeOpacity={0.8}>
          <View style={styles.bookingHeader}>
            <View style={styles.bookingInfo}>
              <DSText variant="label" weight="bold">{item.ritual}</DSText>
              <DSText variant="caption" color="#6B7280">{item.deity} • {item.temple}</DSText>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[item.status] + '20' }]}>
              <DSText variant="caption" weight="semibold" color={STATUS_COLORS[item.status]}>● {item.status.replace('_', ' ')}</DSText>
            </View>
          </View>
          <View style={styles.bookingMeta}>
            <DSText variant="caption" color="#6B7280">📅 {item.date}</DSText>
            <DSText variant="caption" color="#6B7280">⏰ {item.time}</DSText>
            <DSText variant="caption" weight="bold" color="#FF6F00">₹{item.amount}</DSText>
          </View>
          <View style={styles.bookingIdRow}>
            <DSText variant="caption" color="#9CA3AF" style={{ fontFamily: 'monospace' }}>ID: {item.id}</DSText>
            <DSText variant="caption" weight="semibold" color="#FF6F00">View Details →</DSText>
          </View>
        </TouchableOpacity>
      )} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  filterList: { paddingHorizontal: 16, paddingVertical: 8 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#FFFFFF', marginRight: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  filterChipActive: { backgroundColor: '#FF6F00' },
  list: { paddingHorizontal: 16, paddingBottom: 100 },
  bookingCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  bookingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  bookingInfo: { flex: 1 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  bookingMeta: { flexDirection: 'row', marginTop: 12, gap: 12 },
  bookingIdRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
});
