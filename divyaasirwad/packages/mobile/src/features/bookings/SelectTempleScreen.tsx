import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text as DSText, Card } from '@divyaasirwad/design-system';
import { DEITIES } from '@divyaasirwad/shared';

const MOCK_TEMPLES = [
  {
    id: 'kashi-vishwanath',
    name: 'Kashi Vishwanath Temple',
    nameHi: 'काशी विश्वनाथ मंदिर',
    location: 'Varanasi, Uttar Pradesh',
    rating: 4.9,
    reviewCount: 1542,
    deityIds: ['shiva'],
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db',
    category: 'pilgrimage',
    verified: true,
  },
  {
    id: 'somnath',
    name: 'Somnath Jyotirlinga',
    nameHi: 'सोमनाथ ज्योतिर्लिंग',
    location: 'Veraval, Gujarat',
    rating: 4.8,
    reviewCount: 892,
    deityIds: ['shiva'],
    image: 'https://images.unsplash.com/photo-1608976477549-30113dc8d0e7',
    category: 'pilgrimage',
    verified: true,
  },
  {
    id: 'bankey-bihari',
    name: 'Bankey Bihari Mandir',
    nameHi: 'बांके बिहारी मंदिर',
    location: 'Vrindavan, Uttar Pradesh',
    rating: 4.9,
    reviewCount: 2043,
    deityIds: ['krishna'],
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796',
    category: 'famous',
    verified: true,
  },
  {
    id: 'dakshineswar',
    name: 'Dakshineswar Kali Temple',
    nameHi: 'दक्षिणेश्वर काली मंदिर',
    location: 'Kolkata, West Bengal',
    rating: 4.8,
    reviewCount: 1104,
    deityIds: ['kali', 'durga'],
    image: 'https://images.unsplash.com/photo-1552083626-d69aa28a30e8',
    category: 'historic',
    verified: true,
  },
  {
    id: 'tirupati-balaji',
    name: 'Tirupati Balaji Mandir',
    nameHi: 'तिरुपति बालाजी मंदिर',
    location: 'Tirumala, Andhra Pradesh',
    rating: 4.9,
    reviewCount: 3105,
    deityIds: ['vishnu'],
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220',
    category: 'pilgrimage',
    verified: true,
  },
  {
    id: 'hanuman-garhi',
    name: 'Hanuman Garhi',
    nameHi: 'हनुमान गढ़ी',
    location: 'Ayodhya, Uttar Pradesh',
    rating: 4.7,
    reviewCount: 752,
    deityIds: ['hanuman'],
    image: 'https://images.unsplash.com/photo-1608964402636-ee24f9f257f0',
    category: 'famous',
    verified: true,
  },
];

export function SelectTempleScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const deityId = route.params?.deityId;
  const [searchQuery, setSearchQuery] = useState('');

  const selectedDeity = DEITIES.find((d) => d.id === deityId);

  // Filter temples based on Deity selection and Search queries
  const filteredTemples = MOCK_TEMPLES.filter((temple) => {
    const matchesDeity = deityId ? temple.deityIds.includes(deityId) : true;
    const matchesSearch = temple.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          temple.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDeity && matchesSearch;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <DSText variant="heading" weight="extrabold">Select Temple</DSText>
        {selectedDeity && (
          <View style={styles.deityIndicator}>
            <Text style={styles.deityEmoji}>{selectedDeity.icon}</Text>
            <DSText variant="caption" color="#FF6F00" weight="semibold">
              Temples for Lord {selectedDeity.name} ({selectedDeity.nameHi})
            </DSText>
          </View>
        )}
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search temple name or location..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Main List */}
      <FlatList
        data={filteredTemples}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.templeCard} 
            activeOpacity={0.9}
            onPress={() => navigation.navigate('SelectRitual', { deityId, templeId: item.id })}
          >
            <View style={styles.imagePlaceholder}>
              <Text style={styles.templeEmoji}>🛕</Text>
            </View>
            <View style={styles.cardInfo}>
              <View style={styles.titleRow}>
                <DSText variant="subheading" weight="bold" style={styles.title}>{item.name}</DSText>
                {item.verified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>✓ Verified</Text>
                  </View>
                )}
              </View>
              <DSText variant="caption" color="#6B7280" style={styles.location}>📍 {item.location}</DSText>
              
              <View style={styles.footerRow}>
                <View style={styles.ratingContainer}>
                  <Text style={styles.starIcon}>⭐</Text>
                  <DSText variant="caption" weight="bold">{item.rating}</DSText>
                  <DSText variant="caption" color="#9CA3AF"> ({item.reviewCount} reviews)</DSText>
                </View>
                <DSText variant="caption" color="#FF6F00" weight="bold">Select & Book →</DSText>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🛕</Text>
            <DSText variant="label" color="#6B7280">No temples found matching your search.</DSText>
            <Button title="View All Temples" style={styles.resetBtn} onPress={() => { setSearchQuery(''); navigation.setParams({ deityId: undefined }); }} />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { marginBottom: 8 },
  backText: { fontSize: 24, color: '#FF6F00' },
  deityIndicator: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3E0', padding: 8, borderRadius: 8, marginTop: 4 },
  deityEmoji: { fontSize: 18, marginRight: 6 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', marginHorizontal: 16, borderRadius: 12, paddingHorizontal: 16, height: 48, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, marginBottom: 12 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#1A1A1A' },
  clearIcon: { fontSize: 16, color: '#9CA3AF', padding: 4 },
  list: { padding: 16, paddingBottom: 100 },
  templeCard: { backgroundColor: '#FFFFFF', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, marginBottom: 16 },
  imagePlaceholder: { height: 120, backgroundColor: '#FFE0B2', alignItems: 'center', justifyContent: 'center' },
  templeEmoji: { fontSize: 48 },
  cardInfo: { padding: 16 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' },
  title: { flex: 1, marginRight: 8 },
  verifiedBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  verifiedText: { fontSize: 10, color: '#2E7D32', fontWeight: 'bold' },
  location: { marginTop: 4 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 8 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  starIcon: { fontSize: 14, marginRight: 4, color: '#F59E0B' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 40 },
  emptyIcon: { fontSize: 60, marginBottom: 12, opacity: 0.4 },
  resetBtn: { marginTop: 16, width: '60%' },
});
