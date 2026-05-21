import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Text as DSText } from '@divyaasirwad/design-system';
import { useAuthStore } from '../../shared/store';

export function OtpScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { phone } = route.params;
  const { setAuth } = useAuthStore();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<any[]>([]);

  useEffect(() => {
    if (timer > 0) { const t = setInterval(() => setTimer((p) => p - 1), 1000); return () => clearInterval(t); }
  }, [timer]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length === 6) {
      setAuth('mock_token', { id: '1', name: 'User', phone, role: 'user', language: 'en' });
      navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <DSText variant="heading" weight="extrabold">Enter OTP</DSText>
      <DSText variant="body" color="#6B7280" style={styles.subtitle}>OTP sent to +91 {phone}</DSText>
      <View style={styles.otpContainer}>
        {otp.map((digit, i) => (
          <TextInput
            key={i}
            ref={(r) => (inputRefs.current[i] = r)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(t) => handleOtpChange(t, i)}
          />
        ))}
      </View>
      <Button title="Verify OTP" onPress={handleVerify} disabled={otp.join('').length < 6} fullWidth />
      <TouchableOpacity onPress={() => { if (timer === 0) setTimer(30); }} disabled={timer > 0} style={styles.resendContainer}>
        <DSText variant="label" weight="semibold" color={timer > 0 ? '#9CA3AF' : '#FF6F00'}>
          {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
        </DSText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0', paddingHorizontal: 24, paddingTop: 80 },
  backBtn: { marginBottom: 32 },
  backText: { fontSize: 28, color: '#FF6F00' },
  subtitle: { marginTop: 8 },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 48, marginBottom: 32 },
  otpInput: { width: 48, height: 56, backgroundColor: '#FFFFFF', borderRadius: 8, textAlign: 'center', fontSize: 24, fontWeight: '700', color: '#1A1A1A', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  resendContainer: { alignItems: 'center', marginTop: 24 },
});
