import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text as DSText, Input } from '@divyaasirwad/design-system';

export function DevoteeDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const { bookingData } = route.params;
  const [devotees, setDevotees] = useState([{ name: '', gotra: '', relation: 'self' }]);
  const [address, setAddress] = useState('');
  const [specialReq, setSpecialReq] = useState('');

  const addDevotee = () => setDevotees([...devotees, { name: '', gotra: '', relation: 'family' }]);
  const updateDevotee = (index: number, field: string, value: string) => {
    const updated = [...devotees];
    (updated[index] as any)[field] = value;
    setDevotees(updated);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backText}>←</Text></TouchableOpacity>
        <DSText variant="heading" weight="extrabold">Devotee Details</DSText>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {bookingData.type === 'home' && (
          <View style={styles.section}>
            <DSText variant="label" weight="bold" style={styles.sectionTitle}>📍 Home Address</DSText>
            <TextInput style={styles.addressInput} placeholder="Enter your full address" placeholderTextColor="#9CA3AF" multiline value={address} onChangeText={setAddress} />
          </View>
        )}
        <View style={styles.section}>
          <DSText variant="label" weight="bold" style={styles.sectionTitle}>👤 Devotee Details</DSText>
          {devotees.map((dev, i) => (
            <View key={i} style={styles.devoteeCard}>
              <DSText variant="caption" weight="semibold" color="#FF6F00">Devotee {i + 1} {dev.relation === 'self' ? '(You)' : ''}</DSText>
              <Input placeholder="Full Name" value={dev.name} onChangeText={(t) => updateDevotee(i, 'name', t)} containerStyle={{ marginBottom: 8 }} />
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <Input placeholder="Gotra (optional)" value={dev.gotra} onChangeText={(t) => updateDevotee(i, 'gotra', t)} containerStyle={{ flex: 1, marginBottom: 0 }} />
                <Input placeholder="Zodiac (optional)" value={(dev as any).zodiac || ''} onChangeText={(t) => updateDevotee(i, 'zodiac', t)} containerStyle={{ flex: 1, marginBottom: 0 }} />
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.addBtn} onPress={addDevotee}>
            <DSText variant="label" weight="semibold" color="#FF6F00">+ Add Family Member</DSText>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <DSText variant="label" weight="bold" style={styles.sectionTitle}>📝 Special Requests</DSText>
          <TextInput style={styles.addressInput} placeholder="Any specific requirements..." placeholderTextColor="#9CA3AF" multiline value={specialReq} onChangeText={setSpecialReq} />
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
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { marginBottom: 8 },
  backText: { fontSize: 24, color: '#FF6F00' },
  scrollContent: { padding: 16 },
  section: { marginBottom: 24 },
  sectionTitle: { marginBottom: 12 },
  devoteeCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  addressInput: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, fontSize: 14, color: '#1A1A1A', minHeight: 80, textAlignVertical: 'top', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  addBtn: { alignItems: 'center', padding: 16, borderWidth: 2, borderStyle: 'dashed', borderColor: '#FFB300', borderRadius: 12 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
});
