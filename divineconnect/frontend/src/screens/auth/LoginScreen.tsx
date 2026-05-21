import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import Button from '../../components/common/Button';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [phone, setPhone] = useState('');

  const handleSendOtp = () => {
    if (phone.length >= 10) {
      navigation.navigate('Otp', { phone });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.topSection}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🛕</Text>
        </View>
        <Text style={styles.title}>DivineConnect</Text>
        <Text style={styles.subtitle}>Book pujas, connect with temples, experience divinity</Text>
        <Text style={styles.titleHi}>डिवाइनकनेक्ट में आपका स्वागत है</Text>
      </View>
      <View style={styles.formSection}>
        <View style={styles.phoneInputContainer}>
          <Text style={styles.countryCode}>🇮🇳 +91</Text>
          <View style={styles.divider} />
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter phone number"
            placeholderTextColor={colors.textLight}
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <Button title="Send OTP" onPress={handleSendOtp} disabled={phone.length < 10} style={styles.sendBtn} />
        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.orLine} />
        </View>
        <TouchableOpacity style={styles.googleBtn} onPress={() => {}}>
          <Text style={styles.googleIcon}>G</Text>
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  topSection: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xxl },
  logoContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl, ...shadow.lg },
  logoEmoji: { fontSize: 48 },
  title: { fontSize: fontSize.hero, fontWeight: '800', color: colors.primary },
  subtitle: { fontSize: fontSize.md, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm },
  titleHi: { fontSize: fontSize.sm, color: colors.primaryLight, marginTop: spacing.xs },
  formSection: { paddingHorizontal: spacing.xxl, paddingBottom: 60 },
  phoneInputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: borderRadius.lg, paddingHorizontal: spacing.lg, height: 56, ...shadow.sm },
  countryCode: { fontSize: fontSize.lg, fontWeight: '600', color: colors.text },
  divider: { width: 1, height: 24, backgroundColor: colors.border, marginHorizontal: spacing.md },
  phoneInput: { flex: 1, fontSize: fontSize.lg, color: colors.text },
  sendBtn: { marginTop: spacing.lg },
  orContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.xl },
  orLine: { flex: 1, height: 1, backgroundColor: colors.border },
  orText: { marginHorizontal: spacing.lg, color: colors.textSecondary, fontSize: fontSize.sm },
  googleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white, borderRadius: borderRadius.lg, paddingVertical: spacing.lg, ...shadow.sm },
  googleIcon: { fontSize: 20, fontWeight: '800', color: '#4285F4', marginRight: spacing.md },
  googleText: { fontSize: fontSize.lg, fontWeight: '600', color: colors.text },
});
