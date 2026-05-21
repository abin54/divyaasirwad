import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';

export default function BookingSummaryScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const { bookingData } = route.params;

  const total = 2100;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Booking Summary" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📿 Puja Details</Text>
          <View style={styles.row}><Text style={styles.label}>Ritual</Text><Text style={styles.value}>Satyanarayan Puja</Text></View>
          <View style={styles.row}><Text style={styles.label}>Type</Text><Text style={styles.value}>{bookingData.type === 'home' ? 'Home Puja 🏠' : 'Temple Puja 🛕'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Date</Text><Text style={styles.value}>{new Date(bookingData.scheduledDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Time</Text><Text style={styles.value}>{bookingData.scheduledTime}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Package</Text><Text style={styles.value}>{bookingData.packageType || 'Standard'}</Text></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>👤 Devotees</Text>
          {bookingData.devotees?.map((d: any, i: number) => (
            <View key={i} style={styles.devoteeRow}>
              <Text style={styles.devoteeName}>{d.name || 'Not provided'} {d.relation === 'self' ? '(You)' : ''}</Text>
              {d.gotra ? <Text style={styles.devoteeGotra}>Gotra: {d.gotra}</Text> : null}
            </View>
          ))}
        </View>

        {bookingData.address ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📍 Address</Text>
            <Text style={styles.addressText}>{bookingData.address}</Text>
          </View>
        ) : null}

        {bookingData.specialRequests ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📝 Special Requests</Text>
            <Text style={styles.addressText}>{bookingData.specialRequests}</Text>
          </View>
        ) : null}

        <View style={styles.priceCard}>
          <View style={styles.priceRow}><Text style={styles.priceLabel}>Amount</Text><Text style={styles.priceValue}>₹{total}</Text></View>
          <View style={styles.priceRow}><Text style={styles.priceLabel}>Discount</Text><Text style={styles.priceValue}>-₹0</Text></View>
          <View style={[styles.priceRow, styles.totalRow]}><Text style={styles.totalLabel}>Total Amount</Text><Text style={styles.totalValue}>₹{total}</Text></View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
      <View style={styles.bottomBar}>
        <Button title="Proceed to Payment" onPress={() => navigation.navigate('PaymentScreen', { amount: total, bookingId: 'DC' + Date.now() })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  scrollContent: { padding: spacing.xl },
  card: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md, ...shadow.sm },
  cardTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  label: { fontSize: fontSize.md, color: colors.textSecondary },
  value: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  devoteeRow: { paddingVertical: spacing.sm },
  devoteeName: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  devoteeGotra: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  addressText: { fontSize: fontSize.md, color: colors.textSecondary, lineHeight: 22 },
  priceCard: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, ...shadow.md },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm },
  priceLabel: { fontSize: fontSize.md, color: colors.textSecondary },
  priceValue: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  totalRow: { borderTopWidth: 2, borderTopColor: colors.primary, marginTop: spacing.sm, paddingTop: spacing.md },
  totalLabel: { fontSize: fontSize.xl, fontWeight: '800', color: colors.text },
  totalValue: { fontSize: fontSize.xl, fontWeight: '800', color: colors.primary },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.lg, backgroundColor: colors.white, ...shadow.lg },
});
