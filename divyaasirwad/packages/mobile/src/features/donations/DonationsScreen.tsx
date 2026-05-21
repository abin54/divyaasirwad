import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text as DSText, Button } from '@divyaasirwad/design-system';

const CAUSES = [
  { id: 'temple', name: 'Temple Renovation', icon: '🛕', desc: 'Help restore ancient temples' },
  { id: 'annadanam', name: 'Annadanam', icon: '🍚', desc: 'Feed devotees at temples' },
  { id: 'education', name: 'Vedic Education', icon: '📚', desc: 'Support Vedic pathshalas' },
  { id: 'medical', name: 'Medical Aid', icon: '🏥', desc: 'Healthcare for the needy' },
  { id: 'festival', name: 'Festival Sponsorship', icon: '🎉', desc: 'Sponsor community celebrations' },
  { id: 'general', name: 'General Donation', icon: '🙏', desc: 'Support divine causes' },
];

const AMOUNTS = [100, 500, 1000, 2100, 5100, 11000];

export function DonationsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCause, setSelectedCause] = useState('general');
  const [amount, setAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}} style={styles.backBtn}><Text style={styles.backText}>←</Text></TouchableOpacity>
        <DSText variant="heading" weight="extrabold">Donations</DSText>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.banner}>
          <Text style={styles.bannerEmoji}>🙏</Text>
          <DSText variant="subheading" weight="extrabold" color="#FFFFFF">Give with devotion</DSText>
          <DSText variant="caption" color="#FFB300">Every contribution brings blessings</DSText>
        </View>

        <DSText variant="label" weight="bold" style={styles.sectionTitle}>Choose a Cause</DSText>
        {CAUSES.map((cause) => (
          <TouchableOpacity key={cause.id} style={[styles.causeCard, selectedCause === cause.id && styles.causeCardActive]} onPress={() => setSelectedCause(cause.id)}>
            <Text style={styles.causeIcon}>{cause.icon}</Text>
            <View style={styles.causeInfo}>
              <DSText variant="label" weight="bold">{cause.name}</DSText>
              <DSText variant="caption" color="#6B7280">{cause.desc}</DSText>
            </View>
            <View style={[styles.radio, selectedCause === cause.id && styles.radioActive]}>{selectedCause === cause.id && <View style={styles.radioInner} />}</View>
          </TouchableOpacity>
        ))}

        <DSText variant="label" weight="bold" style={styles.sectionTitle}>Amount (₹)</DSText>
        <View style={styles.amountGrid}>
          {AMOUNTS.map((amt) => (
            <TouchableOpacity key={amt} style={[styles.amountBtn, amount === amt.toString() && styles.amountBtnActive]} onPress={() => setAmount(amt.toString())}>
              <DSText variant="label" weight="bold" color={amount === amt.toString() ? '#FF6F00' : '#1A1A1A'}>₹{amt}</DSText>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput style={styles.customAmount} placeholder="Or enter custom amount" placeholderTextColor="#9CA3AF" keyboardType="number-pad" value={amount} onChangeText={setAmount} />

        <TouchableOpacity style={styles.anonRow} onPress={() => setIsAnonymous(!isAnonymous)}>
          <View style={[styles.checkbox, isAnonymous && styles.checkboxActive]}>{isAnonymous && <Text style={styles.checkmark}>✓</Text>}</View>
          <DSText variant="label">Donate anonymously</DSText>
        </TouchableOpacity>

        <Button title={`Donate ₹${amount || '0'}`} onPress={() => {}} disabled={!amount} style={{ marginTop: 16 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { marginBottom: 8 },
  backText: { fontSize: 24, color: '#FF6F00' },
  content: { padding: 16 },
  banner: { backgroundColor: '#FF6F00', borderRadius: 20, padding: 32, alignItems: 'center', marginBottom: 24 },
  bannerEmoji: { fontSize: 48, marginBottom: 8 },
  sectionTitle: { marginBottom: 12 },
  causeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, borderWidth: 2, borderColor: 'transparent' },
  causeCardActive: { borderColor: '#FF6F00' },
  causeIcon: { fontSize: 28, marginRight: 12 },
  causeInfo: { flex: 1 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: '#FF6F00' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#FF6F00' },
  amountGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  amountBtn: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, minWidth: '30%', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, borderWidth: 2, borderColor: 'transparent' },
  amountBtnActive: { borderColor: '#FF6F00', backgroundColor: '#FFF8E1' },
  customAmount: { backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#1A1A1A', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  anonRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  checkbox: { width: 22, height: 22, borderRadius: 4, borderWidth: 2, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  checkboxActive: { borderColor: '#FF6F00', backgroundColor: '#FF6F00' },
  checkmark: { fontSize: 14, color: '#FFFFFF', fontWeight: '800' },
});
