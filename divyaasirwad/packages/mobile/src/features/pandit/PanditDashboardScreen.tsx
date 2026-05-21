import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text as DSText } from '@divyaasirwad/design-system';

export function PanditDashboardScreen() {
  const insets = useSafeAreaInsets();
  const todayBookings = [
    { time: '07:00 AM', ritual: 'Rudrabhishek', devotee: 'Rahul Sharma', status: 'confirmed' },
    { time: '09:00 AM', ritual: 'Satyanarayan Puja', devotee: 'Priya Patel', status: 'confirmed' },
    { time: '11:00 AM', ritual: 'Lakshmi Puja', devotee: 'Amit Kumar', status: 'in_progress' },
    { time: '05:00 PM', ritual: 'Hanuman Chalisa', devotee: 'Sneha Gupta', status: 'pending' },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <DSText variant="subheading" weight="extrabold">Namaste, Pt. Sharma 🙏</DSText>
          <DSText variant="caption" color="#6B7280">Today's Schedule</DSText>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.stat}><DSText variant="subheading" weight="extrabold" color="#FF6F00">4</DSText><DSText variant="caption" color="#6B7280">Today</DSText></View>
          <View style={styles.stat}><DSText variant="subheading" weight="extrabold" color="#FF6F00">12</DSText><DSText variant="caption" color="#6B7280">This Week</DSText></View>
          <View style={styles.stat}><DSText variant="subheading" weight="extrabold" color="#FF6F00">₹45K</DSText><DSText variant="caption" color="#6B7280">Earnings</DSText></View>
          <View style={styles.stat}><DSText variant="subheading" weight="extrabold" color="#FF6F00">4.8★</DSText><DSText variant="caption" color="#6B7280">Rating</DSText></View>
        </View>
        <DSText variant="subheading" weight="bold" style={styles.sectionTitle}>📋 Today's Bookings</DSText>
        {todayBookings.map((b, i) => (
          <View key={i} style={styles.bookingCard}>
            <View style={styles.timeCol}><DSText variant="label" weight="bold" color="#FF6F00">{b.time}</DSText></View>
            <View style={styles.bookingInfo}>
              <DSText variant="label" weight="bold">{b.ritual}</DSText>
              <DSText variant="caption" color="#6B7280">{b.devotee}</DSText>
              <View style={[styles.statusBadge, { backgroundColor: b.status === 'in_progress' ? '#FF6F0020' : '#2563EB20' }]}>
                <DSText variant="caption" weight="semibold" color={b.status === 'in_progress' ? '#FF6F00' : '#2563EB'}>● {b.status}</DSText>
              </View>
            </View>
            <TouchableOpacity style={styles.actionBtn}><DSText variant="caption" weight="bold" color="#FFFFFF">{b.status === 'confirmed' ? 'Start' : 'View'}</DSText></TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  content: { padding: 16 },
  header: { marginBottom: 24 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  stat: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, flex: 1, marginHorizontal: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  sectionTitle: { marginBottom: 12 },
  bookingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  timeCol: { width: 60, alignItems: 'center' },
  bookingInfo: { flex: 1, marginLeft: 12 },
  statusBadge: { alignSelf: 'flex-start', marginTop: 4, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  actionBtn: { backgroundColor: '#FF6F00', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
});
