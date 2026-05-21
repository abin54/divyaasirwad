import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text as DSText } from '@divyaasirwad/design-system';
import { DEITIES } from '@divyaasirwad/shared';

const TEMPLES = [
  { id: '1', name: 'Shri Kashi Vishwanath Temple', city: 'Varanasi', state: 'Uttar Pradesh', rating: 4.8, deity: 'Shiva', distance: '2.5 km' },
  { id: '2', name: 'Shri Ram Janmabhoomi', city: 'Ayodhya', state: 'Uttar Pradesh', rating: 4.9, deity: 'Ram', distance: '12 km' },
  { id: '3', name: 'Banke Bihari Temple', city: 'Vrindavan', state: 'Uttar Pradesh', rating: 4.7, deity: 'Krishna', distance: '5 km' },
  { id: '4', name: 'Dakshineswar Kali Temple', city: 'Kolkata', state: 'West Bengal', rating: 4.6, deity: 'Kali', distance: '3 km' },
  { id: '5', name: 'Siddhivinayak Temple', city: 'Mumbai', state: 'Maharashtra', rating: 4.8, deity: 'Ganesh', distance: '1.5 km' },
  { id: '6', name: 'Meenakshi Amman Temple', city: 'Madurai', state: 'Tamil Nadu', rating: 4.9, deity: 'Durga', distance: '8 km' },
];

const DEITIES_FILTER = ['All', 'Shiva', 'Krishna', 'Durga', 'Hanuman', 'Lakshmi', 'Kali', 'Ram', 'Ganesh'];

export function TempleListScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [activeDeity, setActiveDeity] = useState('All');

  const filtered = activeDeity === 'All' ? TEMPLES : TEMPLES.filter((t) => t.deity === activeDeity);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <DSText variant="heading" weight="extrabold">Temples</DSText>
        <DSText variant="caption" color="#6B7280">Discover divine places</DSText>
      </View>
      <FlatList horizontal showsHorizontalScrollIndicator={false} data={DEITIES_FILTER} renderItem={({ item }) => (
        <TouchableOpacity style={[styles.filterChip, activeDeity === item && styles.filterChipActive]} onPress={() => setActiveDeity(item)}>
          <DSText variant="caption" weight="semibold" color={activeDeity === item ? '#FFFFFF' : '#1A1A1A'}>{item}</DSText>
        </TouchableOpacity>
      )} keyExtractor={(item) => item} contentContainerStyle={styles.filterList} />
      <FlatList data={filtered} renderItem={({ item }) => (
        <TouchableOpacity style={styles.templeCard} onPress={() => navigation.navigate('TempleDetail', { slug: item.id })} activeOpacity={0.8}>
          <View style={styles.templeImageContainer}><Text style={styles.templeEmoji}>🛕</Text></View>
          <View style={styles.templeInfo}>
            <DSText variant="label" weight="bold">{item.name}</DSText>
            <DSText variant="caption" color="#6B7280">{item.city}, {item.state}</DSText>
            <View style={styles.templeMeta}>
              <View style={styles.deityBadge}><DSText variant="caption" color="#FF6F00" weight="semibold">{item.deity}</DSText></View>
              <DSText variant="caption" color="#F59E0B" weight="semibold">★ {item.rating}</DSText>
              <DSText variant="caption" color="#6B7280">📍 {item.distance}</DSText>
            </View>
          </View>
        </TouchableOpacity>
      )} keyExtractor={(item) => item.id} showsVerticalScrollIndicator={false} contentContainerStyle={styles.list} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  filterList: { paddingHorizontal: 16, marginBottom: 12 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#FFFFFF', marginRight: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  filterChipActive: { backgroundColor: '#FF6F00' },
  list: { paddingHorizontal: 16, paddingBottom: 100 },
  templeCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  templeImageContainer: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#FFE0B2', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  templeEmoji: { fontSize: 28 },
  templeInfo: { flex: 1 },
  templeMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 },
  deityBadge: { backgroundColor: '#FFF3E0', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
});
