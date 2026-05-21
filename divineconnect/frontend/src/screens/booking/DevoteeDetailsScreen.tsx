import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';

export default function DevoteeDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const { bookingData } = route.params;

  const [devotees, setDevotees] = useState([{ name: '', gotra: '', relation: 'self' }]);

  const addDevotee = () => setDevotees([...devotees, { name: '', gotra: '', relation: 'family' }]);

  const updateDevotee = (index: number, field: string, value: string) => {
    const updated = [...devotees];
    (updated[index] as any)[field] = value;
    setDevotees(updated);
  };

  const [address, setAddress] = useState('');
  const [specialReq, setSpecialReq] = useState('');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Devotee Details" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {bookingData.type === 'home' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📍 Home Address</Text>
            <TextInput style={styles.addressInput} placeholder="Enter your full address" placeholderTextColor={colors.textLight} multiline value={address} onChangeText={setAddress} />
          </View>
        )}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 Devotee Details</Text>
          {devotees.map((dev, i) => (
            <View key={i} style={styles.devoteeCard}>
              <Text style={styles.devoteeLabel}>Devotee {i + 1} {dev.relation === 'self' ? '(You)' : ''}</Text>
              <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor={colors.textLight} value={dev.name} onChangeText={(t) => updateDevotee(i, 'name', t)} />
              <View style={styles.row}>
                <TextInput style={[styles.input, { flex: 1, marginRight: spacing.sm }]} placeholder="Gotra (optional)" placeholderTextColor={colors.textLight} value={dev.gotra} onChangeText={(t) => updateDevotee(i, 'gotra', t)} />
                <TextInput style={[styles.input, { flex: 1 }]} placeholder="Zodiac (optional)" placeholderTextColor={colors.textLight} value={(dev as any).zodiac || ''} onChangeText={(t) => updateDevotee(i, 'zodiac', t)} />
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.addBtn} onPress={addDevotee}>
            <Text style={styles.addBtnText}>+ Add Family Member</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Special Requests</Text>
          <TextInput style={styles.addressInput} placeholder="Any specific requirements, mantras, or instructions..." placeholderTextColor={colors.textLight} multiline value={specialReq} onChangeText={setSpecialReq} />
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>
      <View style={styles.bottomBar}>
        <Button title="Review Booking" onPress={() => navigation.navigate('BookingSummary', { bookingData: { ...bookingData, devotees, address, specialRequests: specialReq } })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  scrollContent: { padding: spacing.xl },
  section: { marginBottom: spacing.xxl },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  devoteeCard: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md, ...shadow.sm },
  devoteeLabel: { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary, marginBottom: spacing.sm },
  input: { backgroundColor: colors.offWhite, borderRadius: borderRadius.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, fontSize: fontSize.md, color: colors.text, marginBottom: spacing.sm },
  row: { flexDirection: 'row' },
  addressInput: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, fontSize: fontSize.md, color: colors.text, minHeight: 80, textAlignVertical: 'top', ...shadow.sm },
  addBtn: { alignItems: 'center', padding: spacing.lg, borderWidth: 2, borderStyle: 'dashed', borderColor: colors.primaryLight, borderRadius: borderRadius.lg },
  addBtnText: { fontSize: fontSize.md, color: colors.primary, fontWeight: '600' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.lg, backgroundColor: colors.white, ...shadow.lg },
});
