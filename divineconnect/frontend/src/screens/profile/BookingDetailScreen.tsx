import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';

export default function BookingDetailScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const booking = {
    id: 'DCABC123', ritual: 'Satyanarayan Puja', deity: 'Vishnu', temple: 'Kashi Vishwanath Temple',
    date: '15 Jan 2024', time: '09:00 AM', status: 'confirmed', amount: 2100, type: 'Temple Puja',
    devotees: [{ name: 'Rahul Sharma', gotra: 'Kashyap', relation: 'Self' }],
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Booking Details" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statusBanner}>
          <Text style={styles.statusEmoji}>🕉️</Text>
          <Text style={styles.statusTitle}>Booking Confirmed</Text>
          <Text style={styles.statusId}>ID: {booking.id}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.row}><Text style={styles.label}>Ritual</Text><Text style={styles.value}>{booking.ritual}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Deity</Text><Text style={styles.value}>🕉️ {booking.deity}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Type</Text><Text style={styles.value}>{booking.type}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Temple</Text><Text style={styles.value}>{booking.temple}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Date</Text><Text style={styles.value}>{booking.date}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Time</Text><Text style={styles.value}>{booking.time}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Amount</Text><Text style={[styles.value, { fontWeight: '800', color: colors.primary }]}>₹{booking.amount}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 Devotees</Text>
          {booking.devotees.map((d: any, i: number) => (
            <View key={i} style={styles.devoteeItem}>
              <Text style={styles.devoteeName}>{d.name}</Text>
              <Text style={styles.devoteeMeta}>{d.relation} {d.gotra ? `• Gotra: ${d.gotra}` : ''}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 Payment</Text>
          <View style={styles.row}><Text style={styles.label}>Amount</Text><Text style={styles.value}>₹{booking.amount}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Status</Text><Text style={[styles.value, { color: colors.success }]}>Paid</Text></View>
          <View style={styles.row}><Text style={styles.label}>Method</Text><Text style={styles.value}>UPI (Google Pay)</Text></View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  content: { padding: spacing.xl, paddingBottom: 100 },
  statusBanner: { backgroundColor: colors.primary, borderRadius: borderRadius.xl, padding: spacing.xxl, alignItems: 'center', marginBottom: spacing.xl },
  statusEmoji: { fontSize: 48, marginBottom: spacing.sm },
  statusTitle: { fontSize: fontSize.xl, fontWeight: '800', color: colors.white },
  statusId: { fontSize: fontSize.sm, color: colors.saffronLight, marginTop: spacing.xs, fontFamily: 'monospace' },
  section: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md, ...shadow.sm },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  label: { fontSize: fontSize.md, color: colors.textSecondary },
  value: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  devoteeItem: { paddingVertical: spacing.sm },
  devoteeName: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  devoteeMeta: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
});
