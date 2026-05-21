import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text as DSText, Button } from '@divyaasirwad/design-system';

const RASHIS = [
  { name: 'Aries', nameHi: 'मेष', emoji: '♈', today: 'Energy is high. Good for starting new ventures.' },
  { name: 'Taurus', nameHi: 'वृषभ', emoji: '♉', today: 'Financial gains likely. Focus on stability.' },
  { name: 'Gemini', nameHi: 'मिथुन', emoji: '♊', today: 'Communication brings opportunities.' },
  { name: 'Cancer', nameHi: 'कर्क', emoji: '♋', today: 'Emotional balance needed. Family time helps.' },
  { name: 'Leo', nameHi: 'सिंह', emoji: '♌', today: 'Leadership qualities shine. Take charge.' },
  { name: 'Virgo', nameHi: 'कन्या', emoji: '♍', today: 'Details matter today. Be thorough.' },
  { name: 'Libra', nameHi: 'तुला', emoji: '♎', today: 'Harmony in relationships.' },
  { name: 'Scorpio', nameHi: 'वृश्चिक', emoji: '♏', today: 'Deep insights available. Trust intuition.' },
  { name: 'Sagittarius', nameHi: 'धनु', emoji: '♐', today: 'Adventure calls. Travel plans favorable.' },
  { name: 'Capricorn', nameHi: 'मकर', emoji: '♑', today: 'Career progress ahead. Stay disciplined.' },
  { name: 'Aquarius', nameHi: 'कुंभ', emoji: '♒', today: 'Innovation brings success.' },
  { name: 'Pisces', nameHi: 'मीन', emoji: '♓', today: 'Spiritual growth. Meditation recommended.' },
];

export function HoroscopeScreen() {
  const insets = useSafeAreaInsets();
  const [selectedRashi, setSelectedRashi] = useState(0);
  const rashi = RASHIS[selectedRashi];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}} style={styles.backBtn}><Text style={styles.backText}>←</Text></TouchableOpacity>
        <DSText variant="heading" weight="extrabold">Daily Horoscope</DSText>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <DSText variant="body" color="#6B7280" style={styles.date}>📅 {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</DSText>
        <DSText variant="label" weight="bold" style={styles.sectionTitle}>Select Your Rashi</DSText>
        <View style={styles.rashiGrid}>
          {RASHIS.map((r, i) => (
            <View key={i} style={[styles.rashiCard, selectedRashi === i && styles.rashiCardActive]} onTouchEnd={() => setSelectedRashi(i)}>
              <Text style={styles.rashiEmoji}>{r.emoji}</Text>
              <DSText variant="caption" weight="semibold">{r.name}</DSText>
            </View>
          ))}
        </View>
        <View style={styles.predictionCard}>
          <DSText variant="subheading" weight="extrabold">{rashi.emoji} {rashi.name} ({rashi.nameHi})</DSText>
          <DSText variant="body" color="#6B7280" style={styles.predictionText}>{rashi.today}</DSText>
          <View style={styles.luckyRow}><DSText variant="body" color="#6B7280">Lucky Color:</DSText><DSText variant="body" weight="semibold" color="#FF6F00">Saffron</DSText></View>
          <View style={styles.luckyRow}><DSText variant="body" color="#6B7280">Lucky Number:</DSText><DSText variant="body" weight="semibold" color="#FF6F00">7</DSText></View>
          <View style={styles.luckyRow}><DSText variant="body" color="#6B7280">Recommended Puja:</DSText><DSText variant="body" weight="semibold" color="#FF6F00">Satyanarayan Puja</DSText></View>
        </View>
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
  date: { marginBottom: 16 },
  sectionTitle: { marginBottom: 12 },
  rashiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  rashiCard: { width: '23%', aspectRatio: 1, backgroundColor: '#FFFFFF', borderRadius: 12, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, borderWidth: 2, borderColor: 'transparent' },
  rashiCardActive: { borderColor: '#FF6F00', backgroundColor: '#FFF8E1' },
  rashiEmoji: { fontSize: 28 },
  predictionCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  predictionText: { lineHeight: 24, marginBottom: 16 },
  luckyRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
});
