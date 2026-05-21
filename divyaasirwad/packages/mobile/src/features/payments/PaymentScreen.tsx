import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text as DSText, Card } from '@divyaasirwad/design-system';

const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI', icon: '📱', description: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', name: 'Debit/Credit Card', icon: '💳', description: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦', description: 'All major banks' },
  { id: 'wallet', name: 'Wallet', icon: '💰', description: 'Paytm, Mobikwik' },
];

export function PaymentScreen() {
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

  if (processing) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color="#FF6F00" />
          <DSText variant="subheading" weight="bold" style={styles.processingText}>Processing your payment...</DSText>
          <DSText variant="body" color="#6B7280">Please do not press back</DSText>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backText}>←</Text></TouchableOpacity>
        <DSText variant="heading" weight="extrabold">Payment</DSText>
      </View>
      <View style={styles.content}>
        <View style={styles.amountCard}>
          <DSText variant="caption" color="#FFB300">Amount to Pay</DSText>
          <DSText variant="display" weight="extrabold" color="#FFFFFF">₹{amount}</DSText>
          <DSText variant="caption" color="#FFB300">Booking: {bookingId}</DSText>
        </View>
        <DSText variant="label" weight="bold" style={styles.sectionTitle}>Select Payment Method</DSText>
        {PAYMENT_METHODS.map((method) => (
          <TouchableOpacity key={method.id} style={[styles.methodCard, selectedMethod === method.id && styles.methodCardActive]} onPress={() => setSelectedMethod(method.id)}>
            <Text style={styles.methodIcon}>{method.icon}</Text>
            <View style={styles.methodInfo}>
              <DSText variant="label" weight="bold">{method.name}</DSText>
              <DSText variant="caption" color="#6B7280">{method.description}</DSText>
            </View>
            <View style={[styles.radio, selectedMethod === method.id && styles.radioActive]}>{selectedMethod === method.id && <View style={styles.radioInner} />}</View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
          <DSText variant="subheading" weight="extrabold" color="#FFFFFF">Pay ₹{amount}</DSText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { marginBottom: 8 },
  backText: { fontSize: 24, color: '#FF6F00' },
  content: { padding: 16 },
  processingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  processingText: { marginTop: 24 },
  amountCard: { backgroundColor: '#FF6F00', borderRadius: 20, padding: 32, alignItems: 'center', marginBottom: 32 },
  sectionTitle: { marginBottom: 16 },
  methodCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, borderWidth: 2, borderColor: 'transparent' },
  methodCardActive: { borderColor: '#FF6F00' },
  methodIcon: { fontSize: 28, marginRight: 12 },
  methodInfo: { flex: 1 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: '#FF6F00' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#FF6F00' },
  payBtn: { backgroundColor: '#FF6F00', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 3 },
});
