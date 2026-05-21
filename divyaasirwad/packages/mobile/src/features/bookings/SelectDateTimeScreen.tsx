import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text as DSText } from '@divyaasirwad/design-system';

const SLOTS = [{ time: '06:00 AM', label: 'Brahma Muhurta' }, { time: '07:00 AM', label: 'Morning' }, { time: '08:00 AM', label: 'Morning' }, { time: '09:00 AM', label: 'Morning' }, { time: '10:00 AM', label: 'Late Morning' }, { time: '04:00 PM', label: 'Evening' }, { time: '05:00 PM', label: 'Evening' }, { time: '06:00 PM', label: 'Sandhya' }, { time: '07:00 PM', label: 'Evening' }];

const DATES = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(); d.setDate(d.getDate() + i);
  return { date: d.toLocaleDateString('en-IN', { weekday: 'short' }), day: d.getDate(), month: d.toLocaleDateString('en-IN', { month: 'short' }), full: d.toISOString() };
});

export function SelectDateTimeScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState(DATES[0].full);
  const [selectedSlot, setSelectedSlot] = useState(SLOTS[2].time);
  const [pujaType, setPujaType] = useState<'home' | 'temple'>('temple');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backText}>←</Text></TouchableOpacity>
        <DSText variant="heading" weight="extrabold">Select Date & Time</DSText>
      </View>
      <ScrollView>
        <View style={styles.typeSelector}>
          <TouchableOpacity style={[styles.typeBtn, pujaType === 'temple' && styles.typeBtnActive]} onPress={() => setPujaType('temple')}>
            <Text style={styles.typeIcon}>🛕</Text>
            <DSText variant="label" weight="semibold" color={pujaType === 'temple' ? '#FF6F00' : '#1A1A1A'}>Temple Puja</DSText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.typeBtn, pujaType === 'home' && styles.typeBtnActive]} onPress={() => setPujaType('home')}>
            <Text style={styles.typeIcon}>🏠</Text>
            <DSText variant="label" weight="semibold" color={pujaType === 'home' ? '#FF6F00' : '#1A1A1A'}>Home Puja</DSText>
          </TouchableOpacity>
        </View>

        <DSText variant="subheading" weight="bold" style={styles.sectionTitle}>Select Date</DSText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.datesContainer}>
          {DATES.map((d, i) => (
            <TouchableOpacity key={i} style={[styles.dateCard, selectedDate === d.full && styles.dateCardActive]} onPress={() => setSelectedDate(d.full)}>
              <DSText variant="caption" weight="semibold" color={selectedDate === d.full ? '#FFFFFF' : '#6B7280'}>{d.date}</DSText>
              <DSText variant="heading" weight="extrabold" color={selectedDate === d.full ? '#FFFFFF' : '#1A1A1A'}>{d.day}</DSText>
              <DSText variant="caption" weight="semibold" color={selectedDate === d.full ? '#FFFFFF' : '#6B7280'}>{d.month}</DSText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <DSText variant="subheading" weight="bold" style={styles.sectionTitle}>Select Time Slot</DSText>
        <View style={styles.slotsGrid}>
          {SLOTS.map((slot, i) => (
            <TouchableOpacity key={i} style={[styles.slotCard, selectedSlot === slot.time && styles.slotCardActive]} onPress={() => setSelectedSlot(slot.time)}>
              <DSText variant="label" weight="bold" color={selectedSlot === slot.time ? '#FF6F00' : '#1A1A1A'}>{slot.time}</DSText>
              <DSText variant="caption" color={selectedSlot === slot.time ? '#FF6F00' : '#6B7280'}>{slot.label}</DSText>
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
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { marginBottom: 8 },
  backText: { fontSize: 24, color: '#FF6F00' },
  typeSelector: { flexDirection: 'row', paddingHorizontal: 16, gap: 12, marginBottom: 16 },
  typeBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, borderWidth: 2, borderColor: 'transparent' },
  typeBtnActive: { borderColor: '#FF6F00', backgroundColor: '#FFF8E1' },
  typeIcon: { fontSize: 24, marginRight: 8 },
  sectionTitle: { paddingHorizontal: 16, marginBottom: 12 },
  datesContainer: { paddingHorizontal: 16, marginBottom: 24 },
  dateCard: { alignItems: 'center', padding: 12, marginRight: 8, borderRadius: 12, backgroundColor: '#FFFFFF', minWidth: 60, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  dateCardActive: { backgroundColor: '#FF6F00' },
  slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 8 },
  slotCard: { width: '30%', padding: 12, borderRadius: 8, backgroundColor: '#FFFFFF', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, borderWidth: 2, borderColor: 'transparent' },
  slotCardActive: { borderColor: '#FF6F00', backgroundColor: '#FFF8E1' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
});
