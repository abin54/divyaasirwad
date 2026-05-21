import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text as DSText, Card } from '@divyaasirwad/design-system';

export function BookingSummaryScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const { bookingData } = route.params;
  const total = 2100;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backText}>←</Text></TouchableOpacity>
        <DSText variant="heading" weight="extrabold">Booking Summary</DSText>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <DSText variant="label" weight="bold" style={styles.cardTitle}>📿 Puja Details</DSText>
          <View style={styles.row}><DSText variant="body" color="#6B7280">Ritual</DSText><DSText variant="body" weight="semibold">Satyanarayan Puja</DSText></View>
          <View style={styles.row}><DSText variant="body" color="#6B7280">Type</DSText><DSText variant="body" weight="semibold">{bookingData.type === 'home' ? 'Home Puja 🏠' : 'Temple Puja 🛕'}</DSText></View>
          <View style={styles.row}><DSText variant="body" color="#6B7280">Date</DSText><DSText variant="body" weight="semibold">{new Date(bookingData.scheduledDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</DSText></View>
          <View style={styles.row}><DSText variant="body" color="#6B7280">Time</DSText><DSText variant="body" weight="semibold">{bookingData.scheduledTime}</DSText></View>
          <View style={styles.row}><DSText variant="body" color="#6B7280">Package</DSText><DSText variant="body" weight="semibold">{bookingData.packageType || 'Standard'}</DSText></View>
        </Card>

        <Card style={styles.card}>
          <DSText variant="label" weight="bold" style={styles.cardTitle}>👤 Devotees</DSText>
          {bookingData.devotees?.map((d: any, i: number) => (
            <View key={i} style={styles.devoteeRow}>
              <DSText variant="body" weight="semibold">{d.name || 'Not provided'} {d.relation === 'self' ? '(You)' : ''}</DSText>
              {d.gotra ? <DSText variant="caption" color="#6B7280">Gotra: {d.gotra}</DSText> : null}
            </View>
          ))}
        </Card>

        <Card style={styles.priceCard}>
          <View style={styles.priceRow}><DSText variant="body" color="#6B7280">Amount</DSText><DSText variant="body" weight="semibold">₹{total}</DSText></View>
          <View style={styles.priceRow}><DSText variant="body" color="#6B7280">Discount</DSText><DSText variant="body" weight="semibold">-₹0</DSText></View>
          <View style={[styles.priceRow, styles.totalRow]}><DSText variant="subheading" weight="extrabold">Total Amount</DSText><DSText variant="subheading" weight="extrabold" color="#FF6F00">₹{total}</DSText></View>
        </Card>
        <View style={{ height: 120 }} />
      </ScrollView>
      <View style={styles.bottomBar}>
        <Button title="Proceed to Payment" onPress={() => navigation.navigate('PaymentScreen', { amount: total, bookingId: 'DC' + Date.now() })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { marginBottom: 8 },
  backText: { fontSize: 24, color: '#FF6F00' },
  scrollContent: { padding: 16 },
  card: { marginBottom: 8 },
  cardTitle: { marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  devoteeRow: { paddingVertical: 8 },
  priceCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  totalRow: { borderTopWidth: 2, borderTopColor: '#FF6F00', marginTop: 8, paddingTop: 12 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
});
