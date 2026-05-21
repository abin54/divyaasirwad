import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, fontSize, spacing, borderRadius } from '../../constants/theme';
import Button from '../../components/common/Button';

export default function PaymentSuccessScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { bookingId } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.successIcon}>✅</Text>
        <Text style={styles.title}>Payment Successful!</Text>
        <Text style={styles.subtitle}>Your booking has been confirmed</Text>
        <View style={styles.bookingIdCard}>
          <Text style={styles.bookingLabel}>Booking ID</Text>
          <Text style={styles.bookingId}>{bookingId}</Text>
        </View>
        <Text style={styles.info}>You will receive a confirmation message shortly. Track your puja status from My Bookings.</Text>
      </View>
      <View style={styles.bottomButtons}>
        <Button title="View Booking" onPress={() => navigation.navigate('BookingConfirmation', { bookingId })} variant="primary" />
        <Button title="Back to Home" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] })} variant="outline" style={{ marginTop: spacing.md }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight, justifyContent: 'center' },
  content: { alignItems: 'center', paddingHorizontal: spacing.xxl },
  successIcon: { fontSize: 72, marginBottom: spacing.xl },
  title: { fontSize: fontSize.title, fontWeight: '800', color: colors.text, textAlign: 'center' },
  subtitle: { fontSize: fontSize.lg, color: colors.textSecondary, marginTop: spacing.sm },
  bookingIdCard: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.xl, marginTop: spacing.xxl, alignItems: 'center', width: '100%' },
  bookingLabel: { fontSize: fontSize.sm, color: colors.textSecondary },
  bookingId: { fontSize: fontSize.xl, fontWeight: '800', color: colors.primary, marginTop: spacing.xs },
  info: { fontSize: fontSize.sm, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl, lineHeight: 20 },
  bottomButtons: { paddingHorizontal: spacing.xxl, paddingTop: spacing.xxl, paddingBottom: 60 },
});
