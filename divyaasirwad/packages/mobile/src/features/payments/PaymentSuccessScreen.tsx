import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Text as DSText } from '@divyaasirwad/design-system';

export function PaymentSuccessScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { bookingId } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.successIcon}>✅</Text>
        <DSText variant="heading" weight="extrabold" style={styles.title}>Payment Successful!</DSText>
        <DSText variant="body" color="#6B7280" style={styles.subtitle}>Your booking has been confirmed</DSText>
        <View style={styles.bookingIdCard}>
          <DSText variant="caption" color="#6B7280">Booking ID</DSText>
          <DSText variant="subheading" weight="extrabold" color="#FF6F00">{bookingId}</DSText>
        </View>
        <DSText variant="body" color="#6B7280" style={styles.info}>You will receive a confirmation message shortly. Track your puja status from My Bookings.</DSText>
      </View>
      <View style={styles.bottomButtons}>
        <Button title="View Booking" onPress={() => navigation.navigate('BookingConfirmation', { bookingId })} />
        <Button title="Back to Home" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] })} variant="outline" style={{ marginTop: 12 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0', justifyContent: 'center' },
  content: { alignItems: 'center', paddingHorizontal: 24 },
  successIcon: { fontSize: 72, marginBottom: 24 },
  title: { textAlign: 'center' },
  subtitle: { marginTop: 8 },
  bookingIdCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 32, marginTop: 32, alignItems: 'center', width: '100%', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  info: { textAlign: 'center', marginTop: 24, lineHeight: 20 },
  bottomButtons: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 60 },
});
