import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';

const CAUSES = [
  { id: 'temple', name: 'Temple Renovation', icon: '🛕', desc: 'Help restore ancient temples' },
  { id: 'annadanam', name: 'Annadanam', icon: '🍚', desc: 'Feed devotees at temples' },
  { id: 'education', name: 'Vedic Education', icon: '📚', desc: 'Support Vedic pathshalas' },
  { id: 'medical', name: 'Medical Aid', icon: '🏥', desc: 'Healthcare for the needy' },
  { id: 'festival', name: 'Festival Sponsorship', icon: '🎉', desc: 'Sponsor community celebrations' },
  { id: 'general', name: 'General Donation', icon: '🙏', desc: 'Support divine causes' },
];

const AMOUNTS = [100, 500, 1000, 2100, 5100, 11000];

export default function DonationsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCause, setSelectedCause] = useState('general');
  const [amount, setAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Donations" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.banner}>
          <Text style={styles.bannerEmoji}>🙏</Text>
          <Text style={styles.bannerTitle}>Give with devotion</Text>
          <Text style={styles.bannerSub}>Every contribution brings blessings</Text>
        </View>

        <Text style={styles.sectionTitle}>Choose a Cause</Text>
        {CAUSES.map((cause) => (
          <TouchableOpacity
            key={cause.id}
            style={[styles.causeCard, selectedCause === cause.id && styles.causeCardActive]}
            onPress={() => setSelectedCause(cause.id)}
          >
            <Text style={styles.causeIcon}>{cause.icon}</Text>
            <View style={styles.causeInfo}>
              <Text style={styles.causeName}>{cause.name}</Text>
              <Text style={styles.causeDesc}>{cause.desc}</Text>
            </View>
            <View style={[styles.radio, selectedCause === cause.id && styles.radioActive]}>
              {selectedCause === cause.id && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Amount (₹)</Text>
        <View style={styles.amountGrid}>
          {AMOUNTS.map((amt) => (
            <TouchableOpacity
              key={amt}
              style={[styles.amountBtn, amount === amt.toString() && styles.amountBtnActive]}
              onPress={() => setAmount(amt.toString())}
            >
              <Text style={[styles.amountText, amount === amt.toString() && styles.amountTextActive]}>₹{amt}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.customAmount}
          placeholder="Or enter custom amount"
          placeholderTextColor={colors.textLight}
          keyboardType="number-pad"
          value={amount}
          onChangeText={setAmount}
        />

        <TouchableOpacity style={styles.anonRow} onPress={() => setIsAnonymous(!isAnonymous)}>
          <View style={[styles.checkbox, isAnonymous && styles.checkboxActive]}>
            {isAnonymous && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.anonText}>Donate anonymously</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.messageInput}
          placeholder="Message (optional)"
          placeholderTextColor={colors.textLight}
          multiline
          value={message}
          onChangeText={setMessage}
        />

        <Button title={`Donate ₹${amount || '0'}`} onPress={() => {}} disabled={!amount} style={{ marginTop: spacing.lg }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  content: { padding: spacing.xl },
  banner: { backgroundColor: colors.primary, borderRadius: borderRadius.xl, padding: spacing.xxl, alignItems: 'center', marginBottom: spacing.xl },
  bannerEmoji: { fontSize: 48, marginBottom: spacing.sm },
  bannerTitle: { fontSize: fontSize.xl, fontWeight: '800', color: colors.white },
  bannerSub: { fontSize: fontSize.sm, color: colors.saffronLight },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  causeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.sm, ...shadow.sm, borderWidth: 2, borderColor: 'transparent' },
  causeCardActive: { borderColor: colors.primary },
  causeIcon: { fontSize: 28, marginRight: spacing.md },
  causeInfo: { flex: 1 },
  causeName: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  causeDesc: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: colors.primary },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary },
  amountGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.sm },
  amountBtn: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, minWidth: '30%', alignItems: 'center', ...shadow.sm, borderWidth: 2, borderColor: 'transparent' },
  amountBtnActive: { borderColor: colors.primary, backgroundColor: colors.goldLight },
  amountText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text },
  amountTextActive: { color: colors.primary },
  customAmount: { backgroundColor: colors.white, borderRadius: borderRadius.lg, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, fontSize: fontSize.md, color: colors.text, ...shadow.sm },
  anonRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg },
  checkbox: { width: 22, height: 22, borderRadius: 4, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
  checkboxActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  checkmark: { fontSize: 14, color: colors.white, fontWeight: '800' },
  anonText: { fontSize: fontSize.md, color: colors.text },
  messageInput: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, fontSize: fontSize.md, color: colors.text, minHeight: 80, textAlignVertical: 'top', marginTop: spacing.lg, ...shadow.sm },
});
