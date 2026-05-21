import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text as DSText, Card } from '@divyaasirwad/design-system';

export function BookingDetailScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const booking = {
    id: 'DCABC123', ritual: 'Satyanarayan Puja', deity: 'Vishnu', temple: 'Kashi Vishwanath Temple',
    date: '15 Jan 2024', time: '09:00 AM', status: 'confirmed', amount: 2100, type: 'Temple Puja',
    devotees: [{ name: 'Rahul Sharma', gotra: 'Kashyap', relation: 'Self' }],
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backText}>←</Text></TouchableOpacity>
        <DSText variant="heading" weight="extrabold">Booking Details</DSText>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.statusBanner}>
          <Text style={styles.statusEmoji}>🕉️</Text>
          <DSText variant="subheading" weight="extrabold" color="#FFFFFF">Booking Confirmed</DSText>
          <DSText variant="caption" color="#FFB300" style={{ fontFamily: 'monospace' }}>ID: {booking.id}</DSText>
        </Card>

        <Card style={styles.section}>
          <View style={styles.row}><DSText variant="body" color="#6B7280">Ritual</DSText><DSText variant="body" weight="semibold">{booking.ritual}</DSText></View>
          <View style={styles.row}><DSText variant="body" color="#6B7280">Deity</DSText><DSText variant="body" weight="semibold">🕉️ {booking.deity}</DSText></View>
          <View style={styles.row}><DSText variant="body" color="#6B7280">Type</DSText><DSText variant="body" weight="semibold">{booking.type}</DSText></View>
          <View style={styles.row}><DSText variant="body" color="#6B7280">Temple</DSText><DSText variant="body" weight="semibold">{booking.temple}</DSText></View>
          <View style={styles.row}><DSText variant="body" color="#6B7280">Date</DSText><DSText variant="body" weight="semibold">{booking.date}</DSText></View>
          <View style={styles.row}><DSText variant="body" color="#6B7280">Time</DSText><DSText variant="body" weight="semibold">{booking.time}</DSText></View>
          <View style={styles.row}><DSText variant="body" color="#6B7280">Amount</DSText><DSText variant="body" weight="extrabold" color="#FF6F00">₹{booking.amount}</DSText></View>
        </Card>

        <Card style={styles.section}>
          <DSText variant="label" weight="bold" style={styles.sectionTitle}>👤 Devotees</DSText>
          {booking.devotees.map((d: any, i: number) => (
            <View key={i} style={styles.devoteeItem}>
              <DSText variant="body" weight="semibold">{d.name}</DSText>
              <DSText variant="caption" color="#6B7280">{d.relation}{d.gotra ? ` • Gotra: ${d.gotra}` : ''}</DSText>
            </View>
          ))}
        </Card>

        <Card style={styles.section}>
          <DSText variant="label" weight="bold" style={styles.sectionTitle}>💰 Payment</DSText>
          <View style={styles.row}><DSText variant="body" color="#6B7280">Amount</DSText><DSText variant="body" weight="semibold">₹{booking.amount}</DSText></View>
          <View style={styles.row}><DSText variant="body" color="#6B7280">Status</DSText><DSText variant="body" weight="semibold" color="#059669">Paid</DSText></View>
          <View style={styles.row}><DSText variant="body" color="#6B7280">Method</DSText><DSText variant="body" weight="semibold">UPI (Google Pay)</DSText></View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { marginBottom: 8 },
  backText: { fontSize: 24, color: '#FF6F00' },
  content: { padding: 16, paddingBottom: 100 },
  statusBanner: { backgroundColor: '#FF6F00', borderRadius: 20, padding: 32, alignItems: 'center', marginBottom: 24 },
  statusEmoji: { fontSize: 48, marginBottom: 8 },
  section: { marginBottom: 8, padding: 16 },
  sectionTitle: { marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  devoteeItem: { paddingVertical: 8 },
});
