import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import Header from '../../components/common/Header';

const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI', icon: '📱', description: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', name: 'Debit/Credit Card', icon: '💳', description: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦', description: 'All major banks' },
  { id: 'wallet', name: 'Wallet', icon: '💰', description: 'Paytm, Mobikwik, Freecharge' },
];

export default function PaymentScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const { amount, bookingId } = route.params;
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      navigation.replace('PaymentSuccess', { bookingId, paymentId: 'PAY' + Date.now() });
    }, 2000);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title={processing ? 'Processing...' : 'Payment'} />
      {processing ? (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.processingText}>Processing your payment...</Text>
          <Text style={styles.processingSub}>Please do not press back</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.amountCard}>
            <Text style={styles.amountLabel}>Amount to Pay</Text>
            <Text style={styles.amount}>₹{amount}</Text>
            <Text style={styles.bookingRef}>Booking: {bookingId}</Text>
          </View>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[styles.methodCard, selectedMethod === method.id && styles.methodCardActive]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <Text style={styles.methodIcon}>{method.icon}</Text>
              <View style={styles.methodInfo}>
                <Text style={styles.methodName}>{method.name}</Text>
                <Text style={styles.methodDesc}>{method.description}</Text>
              </View>
              <View style={[styles.radio, selectedMethod === method.id && styles.radioActive]}>
                {selectedMethod === method.id && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
            <Text style={styles.payBtnText}>Pay ₹{amount}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  processingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  processingText: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text, marginTop: spacing.xl },
  processingSub: { fontSize: fontSize.md, color: colors.textSecondary, marginTop: spacing.sm },
  content: { padding: spacing.xl },
  amountCard: { backgroundColor: colors.primary, borderRadius: borderRadius.xl, padding: spacing.xxl, alignItems: 'center', marginBottom: spacing.xxl },
  amountLabel: { fontSize: fontSize.sm, color: colors.saffronLight },
  amount: { fontSize: 40, fontWeight: '800', color: colors.white, marginVertical: spacing.sm },
  bookingRef: { fontSize: fontSize.sm, color: colors.saffronLight, opacity: 0.8 },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  methodCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md, ...shadow.sm, borderWidth: 2, borderColor: 'transparent' },
  methodCardActive: { borderColor: colors.primary },
  methodIcon: { fontSize: 28, marginRight: spacing.md },
  methodInfo: { flex: 1 },
  methodName: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  methodDesc: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: colors.primary },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary },
  payBtn: { backgroundColor: colors.primary, borderRadius: borderRadius.lg, padding: spacing.lg, alignItems: 'center', marginTop: spacing.lg, ...shadow.md },
  payBtnText: { fontSize: fontSize.xl, fontWeight: '800', color: colors.white },
});
