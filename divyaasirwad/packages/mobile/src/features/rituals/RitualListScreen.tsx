import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text as DSText, Card } from '@divyaasirwad/design-system';
import { RITUALS, PUJA_CATEGORIES, DEITIES } from '@divyaasirwad/shared';

export function RitualListScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter rituals based on Search query & Category tab selection
  const filteredRituals = RITUALS.filter((ritual) => {
    const matchesCategory = selectedCategory ? ritual.category === selectedCategory : true;
    const matchesSearch = ritual.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ritual.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <DSText variant="heading" weight="extrabold">Sacred Rituals 📿</DSText>
        <DSText variant="caption" color="#6B7280">Book personalized online or home pujas verified by shastras</DSText>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Satyanarayan, Rudrabhishek..."
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

      {/* Categories Horizontal Tabs */}
      <View style={styles.categoryWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          <TouchableOpacity 
            style={[styles.categoryTab, !selectedCategory && styles.categoryTabSelected]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={styles.categoryEmoji}>🌸</Text>
            <DSText variant="caption" weight="semibold" color={!selectedCategory ? '#FFFFFF' : '#1A1A1A'}>All</DSText>
          </TouchableOpacity>
          {PUJA_CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat.id} 
              style={[styles.categoryTab, selectedCategory === cat.id && styles.categoryTabSelected]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text style={styles.categoryEmoji}>{cat.icon}</Text>
              <DSText variant="caption" weight="semibold" color={selectedCategory === cat.id ? '#FFFFFF' : '#1A1A1A'}>{cat.name}</DSText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Rituals Catalog List */}
      <FlatList
        data={filteredRituals}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const associatedDeity = DEITIES.find((d) => d.id === item.deityId);
          return (
            <TouchableOpacity 
              style={styles.ritualCard} 
              activeOpacity={0.8}
              onPress={() => navigation.navigate('RitualDetail', { slug: item.slug })}
            >
              <View style={styles.ritualIconContainer}>
                <Text style={styles.ritualIcon}>{item.icon}</Text>
              </View>
              
              <View style={styles.ritualInfo}>
                <View style={styles.titleRow}>
                  <DSText variant="subheading" weight="bold">{item.name}</DSText>
                  {item.isPopular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>🔥 Popular</Text>
                    </View>
                  )}
                </View>
                
                <DSText variant="caption" color="#6B7280" numberOfLines={1}>
                  Deity: {associatedDeity?.name || 'Vishnu'} • ⏱ {item.duration.basic} - {item.duration.premium} mins
                </DSText>
                
                <DSText variant="caption" color="#9CA3AF" style={styles.shortDesc} numberOfLines={2}>
                  {item.shortDescription}
                </DSText>
                
                <View style={styles.footerRow}>
                  <View style={styles.priceContainer}>
                    <DSText variant="caption" color="#9CA3AF">starting at </DSText>
                    <DSText variant="label" weight="extrabold" color="#FF6F00">₹{item.pricing.basic}</DSText>
                  </View>
                  <DSText variant="caption" color="#FF6F00" weight="bold">View Details →</DSText>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📿</Text>
            <DSText variant="label" color="#6B7280">No rituals found in this category.</DSText>
            <Button title="Reset Filters" style={styles.resetBtn} onPress={() => { setSelectedCategory(null); setSearchQuery(''); }} />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', marginHorizontal: 16, borderRadius: 12, paddingHorizontal: 16, height: 48, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, marginBottom: 12 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#1A1A1A' },
  clearIcon: { fontSize: 16, color: '#9CA3AF', padding: 4 },
  categoryWrapper: { height: 50, marginBottom: 8 },
  categoryScroll: { paddingHorizontal: 12, alignItems: 'center' },
  categoryTab: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  categoryTabSelected: { backgroundColor: '#FF6F00' },
  categoryEmoji: { fontSize: 14, marginRight: 6 },
  list: { padding: 16, paddingBottom: 100 },
  ritualCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  ritualIconContainer: { width: 56, height: 56, borderRadius: 16, backgroundColor: '#FFF3E0', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  ritualIcon: { fontSize: 32 },
  ritualInfo: { flex: 1 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' },
  popularBadge: { backgroundColor: '#FFF3E0', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  popularText: { fontSize: 9, color: '#FF6F00', fontWeight: 'bold' },
  shortDesc: { marginTop: 4, lineHeight: 16 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 8 },
  priceContainer: { flexDirection: 'row', alignItems: 'center' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 40 },
  emptyIcon: { fontSize: 60, marginBottom: 12, opacity: 0.4 },
  resetBtn: { marginTop: 16, width: '60%' },
});
