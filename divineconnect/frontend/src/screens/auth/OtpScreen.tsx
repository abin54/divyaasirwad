import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import Button from '../../components/common/Button';
import { useAuthStore } from '../../store';

export default function OtpScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { phone } = route.params;
  const { setAuth } = useAuthStore();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs: any[] = [];

  useEffect(() => {
    if (timer > 0) { const t = setInterval(() => setTimer((p) => p - 1), 1000); return () => clearInterval(t); }
  }, [timer]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 5) inputRefs[index + 1]?.focus();
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length === 6) {
      setAuth('mock_token', 'mock_refresh', { id: '1', name: 'User', phone, role: 'user', language: 'en', familyMembers: [], addresses: [] });
      navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>OTP sent to +91 {phone}</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, i) => (
          <TextInput
            key={i}
            ref={(r) => (inputRefs[i] = r)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(t) => handleOtpChange(t, i)}
          />
        ))}
      </View>
      <Button title="Verify OTP" onPress={handleVerify} disabled={otp.join('').length < 6} style={styles.verifyBtn} />
      <TouchableOpacity onPress={() => { if (timer === 0) { setTimer(30); } }} disabled={timer > 0} style={styles.resendContainer}>
        <Text style={[styles.resendText, timer > 0 && styles.resendDisabled]}>
          {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight, paddingHorizontal: spacing.xxl, paddingTop: 80 },
  backBtn: { marginBottom: spacing.xxl },
  backText: { fontSize: 28, color: colors.primary },
  title: { fontSize: fontSize.title, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: fontSize.md, color: colors.textSecondary, marginTop: spacing.sm },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xxxl, marginBottom: spacing.xxl },
  otpInput: { width: 48, height: 56, backgroundColor: colors.white, borderRadius: borderRadius.md, textAlign: 'center', fontSize: fontSize.xxl, fontWeight: '700', color: colors.text, ...shadow.sm },
  verifyBtn: { marginTop: spacing.lg },
  resendContainer: { alignItems: 'center', marginTop: spacing.xl },
  resendText: { fontSize: fontSize.md, color: colors.primary, fontWeight: '600' },
  resendDisabled: { color: colors.textLight },
});
