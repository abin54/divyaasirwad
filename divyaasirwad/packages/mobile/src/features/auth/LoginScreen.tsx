import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Text as DSText, Card, Input } from '@divyaasirwad/design-system';
import auth from '@react-native-firebase/auth';

export function LoginScreen() {
  const navigation = useNavigation<any>();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (phone.length < 10) return;
    setLoading(true);
    try {
      auth().settings.appVerificationDisabledForTesting = true;
      const confirmResult = await auth().signInWithPhoneNumber(`+91${phone}`);
      navigation.navigate('Otp', { phone, confirmResult });
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.topSection}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🛕</Text>
        </View>
        <DSText variant="display" weight="extrabold" color="#FF6F00">Divyaasirwad</DSText>
        <DSText variant="body" color="#6B7280" style={styles.subtitle}>Book pujas, connect with temples, experience divinity</DSText>
        <DSText variant="label" color="#FF9933" style={styles.subtitleHi}>दिव्याशीर्वाद में आपका स्वागत है</DSText>
      </View>
      <View style={styles.formSection}>
        <Input
          label="Phone Number"
          placeholder="Enter 10-digit phone number"
          keyboardType="phone-pad"
          maxLength={10}
          value={phone}
          onChangeText={setPhone}
          leftIcon={<Text style={styles.countryCode}>🇮🇳 +91</Text>}
        />
        <Button title={loading ? 'Sending OTP...' : 'Send OTP'} onPress={handleSendOtp} disabled={phone.length < 10 || loading} fullWidth />
        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <DSText variant="caption" color="#6B7280">OR</DSText>
          <View style={styles.orLine} />
        </View>
        <TouchableOpacity style={styles.googleBtn} onPress={() => {}}>
          <Text style={styles.googleIcon}>G</Text>
          <DSText variant="label" weight="semibold">Continue with Google</DSText>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  topSection: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  logoContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  logoEmoji: { fontSize: 48 },
  subtitle: { textAlign: 'center', marginTop: 8 },
  subtitleHi: { marginTop: 4 },
  formSection: { paddingHorizontal: 24, paddingBottom: 60 },
  countryCode: { fontSize: 16, fontWeight: '600' },
  orContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  orLine: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  googleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, paddingVertical: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  googleIcon: { fontSize: 20, fontWeight: '800', color: '#4285F4', marginRight: 12 },
});
