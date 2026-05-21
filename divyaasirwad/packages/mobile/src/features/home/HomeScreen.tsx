import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../../shared/store';
import { Button, Text as DSText, Card } from '@divyaasirwad/design-system';
import { DEITIES, FESTIVALS_2026 } from '@divyaasirwad/shared';

const CATEGORIES = [
  { id: 'puja', name: 'Puja', icon: '📿' },
  { id: 'yatra', name: 'Yatra', icon: '🚌' },
  { id: 'darshan', name: 'Live Darshan', icon: '📺' },
  { id: 'horoscope', name: 'Horoscope', icon: '⭐' },
  { id: 'donation', name: 'Donate', icon: '🙏' },
  { id: 'music', name: 'Bhajans', icon: '🎵' },
];

const MOCK_TEMPLES = [
  { id: '1', name: 'Kashi Vishwanath', location: 'Varanasi, UP', rating: 4.8, deity: 'Shiva' },
  { id: '2', name: 'Tirupati Balaji', location: 'Tirupati, AP', rating: 4.9, deity: 'Venkateswara' },
  { id: '3', name: 'Golden Temple', location: 'Amritsar, Punjab', rating: 4.9, deity: 'Harmandir Sahib' },
  { id: '4', name: 'Somnath Temple', location: 'Veraval, Gujarat', rating: 4.7, deity: 'Shiva' },
];

const MOCK_RITUALS = [
  { id: '1', name: 'Satyanarayan Puja', deity: 'Vishnu', price: 1100, duration: 60, icon: '📿' },
  { id: '2', name: 'Rudrabhishek', deity: 'Shiva', price: 1500, duration: 60, icon: '🔱' },
  { id: '3', name: 'Lakshmi Puja', deity: 'Lakshmi', price: 1100, duration: 45, icon: '🌺' },
  { id: '4', name: 'Navgraha Puja', deity: 'Shiva', price: 2100, duration: 90, icon: '🌍' },
  { id: '5', name: 'Hanuman Chalisa', deity: 'Hanuman', price: 500, duration: 30, icon: '🙏' },
];

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <DSText variant="subheading" weight="extrabold">Namaste, {user?.name || 'Devotee'} 🙏</DSText>
            <DSText variant="caption" color="#6B7280">Find peace through devotion</DSText>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.avatar}>
            <DSText variant="label" weight="bold" color="#FFFFFF">{(user?.name || 'D')[0].toUpperCase()}</DSText>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search temples, pujas, pandits..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => searchQuery && navigation.navigate('TempleList', { q: searchQuery })}
            returnKeyType="search"
          />
        </View>

        <View style={styles.categoriesRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoryItem} onPress={() => {
              if (cat.id === 'yatra') navigation.navigate('YatraList');
              else if (cat.id === 'puja') navigation.navigate('SelectDeity');
              else if (cat.id === 'horoscope') navigation.navigate('Horoscope');
              else if (cat.id === 'donation') navigation.navigate('Donations');
            }}>
              <View style={styles.categoryIcon}><Text style={styles.categoryEmoji}>{cat.icon}</Text></View>
              <DSText variant="caption" weight="semibold" style={styles.categoryName}>{cat.name}</DSText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <DSText variant="subheading" weight="bold">Featured Temples 🛕</DSText>
          <TouchableOpacity onPress={() => navigation.navigate('Temples')}><DSText variant="caption" color="#FF6F00" weight="semibold">See All</DSText></TouchableOpacity>
        </View>
        <FlatList
          data={MOCK_TEMPLES}
          horizontal showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('TempleDetail', { slug: item.name.toLowerCase().replace(/\s+/g, '-') })} style={styles.templeCard} activeOpacity={0.9}>
              <View style={styles.templeImage}><Text style={styles.templeEmoji}>🛕</Text></View>
              <View style={styles.templeInfo}>
                <DSText variant="label" weight="bold" numberOfLines={1}>{item.name}</DSText>
                <DSText variant="caption" color="#6B7280">{item.location}</DSText>
                <View style={styles.templeMeta}>
                  <DSText variant="caption" color="#F59E0B" weight="semibold">★ {item.rating}</DSText>
                  <DSText variant="caption" color="#FF6F00" weight="semibold">Book →</DSText>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.sectionHeader}>
          <DSText variant="subheading" weight="bold">Trending Pujas 📿</DSText>
          <TouchableOpacity onPress={() => navigation.navigate('Pujas')}><DSText variant="caption" color="#FF6F00" weight="semibold">See All</DSText></TouchableOpacity>
        </View>
        {MOCK_RITUALS.map((ritual) => (
          <TouchableOpacity key={ritual.id} style={styles.ritualCard} onPress={() => navigation.navigate('RitualDetail', { slug: ritual.name.toLowerCase().replace(/\s+/g, '-') })} activeOpacity={0.8}>
            <View style={styles.ritualIconContainer}><Text style={styles.ritualIcon}>{ritual.icon}</Text></View>
            <View style={styles.ritualInfo}>
              <DSText variant="label" weight="bold">{ritual.name}</DSText>
              <DSText variant="caption" color="#6B7280">{ritual.deity} • ⏱ {ritual.duration} min</DSText>
            </View>
            <View style={styles.priceSection}>
              <DSText variant="subheading" weight="extrabold" color="#FF6F00">₹{ritual.price}</DSText>
              <DSText variant="caption" color="#9CA3AF">starting</DSText>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FF6F00', alignItems: 'center', justifyContent: 'center' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', marginHorizontal: 16, borderRadius: 12, paddingHorizontal: 16, height: 48, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#1A1A1A' },
  categoriesRow: { flexDirection: 'row', paddingHorizontal: 12, marginTop: 24, paddingBottom: 8 },
  categoryItem: { alignItems: 'center', marginRight: 16, width: 64 },
  categoryIcon: { width: 52, height: 52, borderRadius: 16, backgroundColor: '#FFF3E0', alignItems: 'center', justifyContent: 'center' },
  categoryEmoji: { fontSize: 24 },
  categoryName: { marginTop: 4, textAlign: 'center' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 24, marginBottom: 12 },
  templeCard: { width: 200, marginRight: 12, backgroundColor: '#FFFFFF', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  templeImage: { height: 100, backgroundColor: '#FFE0B2', alignItems: 'center', justifyContent: 'center' },
  templeEmoji: { fontSize: 40 },
  templeInfo: { padding: 12 },
  templeMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  ritualCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, marginBottom: 8, marginHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  ritualIconContainer: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#FFF3E0', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  ritualIcon: { fontSize: 24 },
  ritualInfo: { flex: 1 },
  priceSection: { alignItems: 'flex-end' },
});
