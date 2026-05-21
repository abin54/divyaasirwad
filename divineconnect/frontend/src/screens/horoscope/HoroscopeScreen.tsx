import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import Header from '../../components/common/Header';

const RASHIS = [
  { name: 'Aries', nameHi: 'मेष', emoji: '♈', today: 'Energy is high. Good for starting new ventures.' },
  { name: 'Taurus', nameHi: 'वृषभ', emoji: '♉', today: 'Financial gains likely. Focus on stability.' },
  { name: 'Gemini', nameHi: 'मिथुन', emoji: '♊', today: 'Communication brings opportunities.' },
  { name: 'Cancer', nameHi: 'कर्क', emoji: '♋', today: 'Emotional balance needed. Family time helps.' },
  { name: 'Leo', nameHi: 'सिंह', emoji: '♌', today: 'Leadership qualities shine. Take charge.' },
  { name: 'Virgo', nameHi: 'कन्या', emoji: '♍', today: 'Details matter today. Be thorough.' },
  { name: 'Libra', nameHi: 'तुला', emoji: '♎', today: 'Harmony in relationships. Good for partnerships.' },
  { name: 'Scorpio', nameHi: 'वृश्चिक', emoji: '♏', today: 'Deep insights available. Trust your intuition.' },
  { name: 'Sagittarius', nameHi: 'धनु', emoji: '♐', today: 'Adventure calls. Travel plans favorable.' },
  { name: 'Capricorn', nameHi: 'मकर', emoji: '♑', today: 'Career progress ahead. Stay disciplined.' },
  { name: 'Aquarius', nameHi: 'कुंभ', emoji: '♒', today: 'Innovation brings success. Think differently.' },
  { name: 'Pisces', nameHi: 'मीन', emoji: '♓', today: 'Spiritual growth. Meditation recommended.' },
];

export default function HoroscopeScreen() {
  const insets = useSafeAreaInsets();
  const [selectedRashi, setSelectedRashi] = useState(0);
  const rashi = RASHIS[selectedRashi];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Daily Horoscope" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.date}>📅 {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</Text>
        <Text style={styles.sectionTitle}>Select Your Rashi</Text>
        <View style={styles.rashiGrid}>
          {RASHIS.map((r, i) => (
            <View key={i} style={[styles.rashiCard, selectedRashi === i && styles.rashiCardActive]} onTouchEnd={() => setSelectedRashi(i)}>
              <Text style={styles.rashiEmoji}>{r.emoji}</Text>
              <Text style={styles.rashiName}>{r.name}</Text>
            </View>
          ))}
        </View>
        <View style={styles.predictionCard}>
          <Text style={styles.predictionTitle}>{rashi.emoji} {rashi.name} ({rashi.nameHi})</Text>
          <Text style={styles.predictionText}>{rashi.today}</Text>
          <View style={styles.luckyRow}>
            <Text style={styles.luckyLabel}>Lucky Color:</Text><Text style={styles.luckyValue}>Saffron</Text>
          </View>
          <View style={styles.luckyRow}>
            <Text style={styles.luckyLabel}>Lucky Number:</Text><Text style={styles.luckyValue}>7</Text>
          </View>
          <View style={styles.luckyRow}>
            <Text style={styles.luckyLabel}>Recommended Puja:</Text><Text style={styles.luckyValue}>Satyanarayan Puja</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  content: { padding: spacing.xl },
  date: { fontSize: fontSize.md, color: colors.textSecondary, marginBottom: spacing.lg },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  rashiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.xl },
  rashiCard: { width: '23%', aspectRatio: 1, backgroundColor: colors.white, borderRadius: borderRadius.lg, alignItems: 'center', justifyContent: 'center', ...shadow.sm, borderWidth: 2, borderColor: 'transparent' },
  rashiCardActive: { borderColor: colors.primary, backgroundColor: colors.goldLight },
  rashiEmoji: { fontSize: 28 },
  rashiName: { fontSize: fontSize.xs, fontWeight: '600', color: colors.text, marginTop: 2 },
  predictionCard: { backgroundColor: colors.white, borderRadius: borderRadius.xl, padding: spacing.xl, ...shadow.md },
  predictionTitle: { fontSize: fontSize.xl, fontWeight: '800', color: colors.text, marginBottom: spacing.md },
  predictionText: { fontSize: fontSize.md, color: colors.textSecondary, lineHeight: 24, marginBottom: spacing.lg },
  luckyRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  luckyLabel: { fontSize: fontSize.sm, color: colors.textSecondary },
  luckyValue: { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary },
});
