import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';

export default function PanditDashboardScreen() {
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
          <Text style={styles.greeting}>Namaste, Pt. Sharma 🙏</Text>
          <Text style={styles.subtitle}>Today's Schedule</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.stat}><Text style={styles.statNum}>4</Text><Text style={styles.statLabel}>Today</Text></View>
          <View style={styles.stat}><Text style={styles.statNum}>12</Text><Text style={styles.statLabel}>This Week</Text></View>
          <View style={styles.stat}><Text style={styles.statNum}>₹45K</Text><Text style={styles.statLabel}>Earnings</Text></View>
          <View style={styles.stat}><Text style={styles.statNum}>4.8★</Text><Text style={styles.statLabel}>Rating</Text></View>
        </View>
        <Text style={styles.sectionTitle}>📋 Today's Bookings</Text>
        {todayBookings.map((b, i) => (
          <View key={i} style={styles.bookingCard}>
            <View style={styles.timeCol}>
              <Text style={styles.timeText}>{b.time}</Text>
            </View>
            <View style={styles.bookingInfo}>
              <Text style={styles.ritualName}>{b.ritual}</Text>
              <Text style={styles.devoteeName}>{b.devotee}</Text>
              <View style={[styles.statusBadge, { backgroundColor: b.status === 'in_progress' ? colors.primary + '20' : colors.info + '20' }]}>
                <Text style={[styles.statusText, { color: b.status === 'in_progress' ? colors.primary : colors.info }]}>● {b.status}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionBtnText}>{b.status === 'confirmed' ? 'Start' : 'View'}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  content: { padding: spacing.xl },
  header: { marginBottom: spacing.xl },
  greeting: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: fontSize.md, color: colors.textSecondary, marginTop: 2 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xxl },
  stat: { alignItems: 'center', backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, flex: 1, marginHorizontal: 4, ...shadow.sm },
  statNum: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.primary },
  statLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
  sectionTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  bookingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.sm, ...shadow.sm },
  timeCol: { width: 60, alignItems: 'center' },
  timeText: { fontSize: fontSize.sm, fontWeight: '700', color: colors.primary },
  bookingInfo: { flex: 1, marginLeft: spacing.md },
  ritualName: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  devoteeName: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  statusBadge: { alignSelf: 'flex-start', marginTop: spacing.xs, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
  statusText: { fontSize: fontSize.xs, fontWeight: '600' },
  actionBtn: { backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
  actionBtnText: { fontSize: fontSize.sm, fontWeight: '700', color: colors.white },
});
