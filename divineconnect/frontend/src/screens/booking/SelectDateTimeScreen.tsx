import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';

const SLOTS = [
  { time: '06:00 AM', label: 'Brahma Muhurta' },
  { time: '07:00 AM', label: 'Morning' },
  { time: '08:00 AM', label: 'Morning' },
  { time: '09:00 AM', label: 'Morning' },
  { time: '10:00 AM', label: 'Late Morning' },
  { time: '11:00 AM', label: 'Pre-Noon' },
  { time: '04:00 PM', label: ' Evening' },
  { time: '05:00 PM', label: 'Evening' },
  { time: '06:00 PM', label: 'Sandhya' },
  { time: '07:00 PM', label: 'Evening' },
];

const DATES = Array.from({ length: 14 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return { date: d.toLocaleDateString('en-IN', { weekday: 'short' }), day: d.getDate(), month: d.toLocaleDateString('en-IN', { month: 'short' }), full: d.toISOString() };
});

export default function SelectDateTimeScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(DATES[0].full);
  const [selectedSlot, setSelectedSlot] = useState(SLOTS[2].time);
  const [pujaType, setPujaType] = useState<'home' | 'temple'>('temple');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Select Date & Time" />
      <ScrollView>
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeBtn, pujaType === 'temple' && styles.typeBtnActive]}
            onPress={() => setPujaType('temple')}
          >
            <Text style={styles.typeIcon}>🛕</Text>
            <Text style={[styles.typeLabel, pujaType === 'temple' && styles.typeLabelActive]}>Temple Puja</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeBtn, pujaType === 'home' && styles.typeBtnActive]}
            onPress={() => setPujaType('home')}
          >
            <Text style={styles.typeIcon}>🏠</Text>
            <Text style={[styles.typeLabel, pujaType === 'home' && styles.typeLabelActive]}>Home Puja</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.datesContainer}>
          {DATES.map((d, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.dateCard, selectedDate === d.full && styles.dateCardActive]}
              onPress={() => setSelectedDate(d.full)}
            >
              <Text style={[styles.dateDay, selectedDate === d.full && styles.dateTextActive]}>{d.date}</Text>
              <Text style={[styles.dateNum, selectedDate === d.full && styles.dateTextActive]}>{d.day}</Text>
              <Text style={[styles.dateMonth, selectedDate === d.full && styles.dateTextActive]}>{d.month}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Select Time Slot</Text>
        <View style={styles.slotsGrid}>
          {SLOTS.map((slot, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.slotCard, selectedSlot === slot.time && styles.slotCardActive]}
              onPress={() => setSelectedSlot(slot.time)}
            >
              <Text style={[styles.slotTime, selectedSlot === slot.time && styles.slotTextActive]}>{slot.time}</Text>
              <Text style={[styles.slotLabel, selectedSlot === slot.time && styles.slotTextActive]}>{slot.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
      <View style={styles.bottomBar}>
        <Button title="Continue to Devotee Details" onPress={() => navigation.navigate('DevoteeDetails', { bookingData: { ...route.params, scheduledDate: selectedDate, scheduledTime: selectedSlot, type: pujaType } })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  typeSelector: { flexDirection: 'row', paddingHorizontal: spacing.xl, gap: spacing.md, marginBottom: spacing.lg },
  typeBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, ...shadow.sm, borderWidth: 2, borderColor: 'transparent' },
  typeBtnActive: { borderColor: colors.primary, backgroundColor: colors.goldLight },
  typeIcon: { fontSize: 24, marginRight: spacing.sm },
  typeLabel: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  typeLabelActive: { color: colors.primary },
  sectionTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text, paddingHorizontal: spacing.xl, marginBottom: spacing.md },
  datesContainer: { paddingHorizontal: spacing.xl, marginBottom: spacing.xl },
  dateCard: { alignItems: 'center', padding: spacing.md, marginRight: spacing.md, borderRadius: borderRadius.lg, backgroundColor: colors.white, minWidth: 60, ...shadow.sm },
  dateCardActive: { backgroundColor: colors.primary },
  dateDay: { fontSize: fontSize.xs, color: colors.textSecondary, fontWeight: '600' },
  dateNum: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.text, marginVertical: 2 },
  dateMonth: { fontSize: fontSize.xs, color: colors.textSecondary, fontWeight: '600' },
  dateTextActive: { color: colors.white },
  slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.xl, gap: spacing.sm },
  slotCard: { width: '30%', padding: spacing.md, borderRadius: borderRadius.md, backgroundColor: colors.white, alignItems: 'center', ...shadow.sm, borderWidth: 2, borderColor: 'transparent' },
  slotCardActive: { borderColor: colors.primary, backgroundColor: colors.goldLight },
  slotTime: { fontSize: fontSize.sm, fontWeight: '700', color: colors.text },
  slotLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
  slotTextActive: { color: colors.primary },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.lg, backgroundColor: colors.white, ...shadow.lg },
});
