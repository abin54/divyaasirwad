import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import { useAuthStore } from '../../store';
import FeaturedTempleCard from '../../components/home/FeaturedTempleCard';
import TrendingPujaCard from '../../components/home/TrendingPujaCard';
import { DEITIES } from '../../constants/deities';
import { RITUALS } from '../../constants/rituals';

const CATEGORIES = [
  { id: 'puja', name: 'Puja', icon: '📿', color: '#FFF3E0' },
  { id: 'yatra', name: 'Yatra', icon: '🚌', color: '#E8F5E9' },
  { id: 'darshan', name: 'Live Darshan', icon: '📺', color: '#FCE4EC' },
  { id: 'horoscope', name: 'Horoscope', icon: '⭐', color: '#E3F2FD' },
  { id: 'donation', name: 'Donate', icon: '🙏', color: '#F3E5F5' },
  { id: 'music', name: 'Bhajans', icon: '🎵', color: '#E0F7FA' },
];

const OFFERS = [
  { id: '1', title: 'Shravan Special', subtitle: 'Rudrabhishek at 20% off', color: '#FFE0B2', textColor: '#E65100' },
  { id: '2', title: 'Janmashtami Offer', subtitle: 'Krishna puja packages starting ₹1100', color: '#E3F2FD', textColor: '#1565C0' },
  { id: '3', title: 'Navratri Special', subtitle: 'Durga Saptashati path at ₹2100', color: '#FCE4EC', textColor: '#C62828' },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) navigation.navigate('TempleList', { q: searchQuery });
  };

  const renderDeityItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => navigation.navigate('TempleList', { deity: item.id })} style={[styles.deityCard, { backgroundColor: item.color }]}>
      <Text style={styles.deityIcon}>{item.icon}</Text>
      <Text style={styles.deityName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderOfferItem = ({ item }: any) => (
    <LinearGradient colors={[item.color, item.color]} style={styles.offerCard}>
      <Text style={[styles.offerTitle, { color: item.textColor }]}>{item.title}</Text>
      <Text style={[styles.offerSubtitle, { color: item.textColor }]}>{item.subtitle}</Text>
      <TouchableOpacity style={styles.offerBtn}>
        <Text style={[styles.offerBtnText, { color: item.textColor }]}>Book Now →</Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Namaste, {user?.name || 'Devotee'} 🙏</Text>
            <Text style={styles.greetingSub}>Find peace through devotion</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.avatar}>
            <Text style={styles.avatarText}>{(user?.name || 'D')[0].toUpperCase()}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search temples, pujas, pandits..."
            placeholderTextColor={colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>

        <View style={styles.categoriesRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoryItem} onPress={() => {
              if (cat.id === 'yatra') navigation.navigate('YatraList');
              else if (cat.id === 'puja') navigation.navigate('RitualList');
              else if (cat.id === 'darshan') {/* navigate to LiveDarshan */}
              else if (cat.id === 'horoscope') {/* navigate to Horoscope */}
              else if (cat.id === 'donation') {/* navigate to Donations */}
            }}>
              <View style={[styles.categoryIcon, { backgroundColor: cat.color }]}>
                <Text style={styles.categoryEmoji}>{cat.icon}</Text>
              </View>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Festival Offers 🎉</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <FlatList data={OFFERS} renderItem={renderOfferItem} keyExtractor={(item) => item.id} horizontal showsHorizontalScrollIndicator={false} style={styles.offersList} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Deities 🕉️</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <FlatList data={DEITIES.slice(0, 8)} renderItem={renderDeityItem} keyExtractor={(item) => item.id} horizontal showsHorizontalScrollIndicator={false} style={styles.deitiesList} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Temples 🛕</Text>
          <TouchableOpacity onPress={() => navigation.navigate('TempleList')}><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <FlatList
          data={[
            { id: '1', name: 'Kashi Vishwanath', location: 'Varanasi, UP', image: '', rating: 4.8, deity: 'Shiva' },
            { id: '2', name: 'Tirupati Balaji', location: 'Tirupati, AP', image: '', rating: 4.9, deity: 'Venkateswara' },
            { id: '3', name: 'Golden Temple', location: 'Amritsar, Punjab', image: '', rating: 4.9, deity: 'Harmandir Sahib' },
            { id: '4', name: 'Somnath Temple', location: 'Veraval, Gujarat', image: '', rating: 4.7, deity: 'Shiva' },
          ]}
          renderItem={({ item }) => (
            <FeaturedTempleCard
              name={item.name} location={item.location} image={item.image}
              rating={item.rating} deity={item.deity}
              onPress={() => navigation.navigate('TempleDetail', { slug: item.name.toLowerCase().replace(/\s+/g, '-') })}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal showsHorizontalScrollIndicator={false}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Pujas 📿</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RitualList')}><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <View style={styles.pujasList}>
          {RITUALS.slice(0, 5).map((ritual) => (
            <TrendingPujaCard
              key={ritual.id}
              name={ritual.name} deity={ritual.deity}
              price={ritual.price.basic} duration={ritual.duration.basic}
              icon={ritual.icon}
              onPress={() => navigation.navigate('RitualDetail', { slug: ritual.id })}
            />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.xl, paddingVertical: spacing.lg },
  greeting: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.text },
  greetingSub: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: fontSize.xl, fontWeight: '700', color: colors.white },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, marginHorizontal: spacing.xl, borderRadius: borderRadius.lg, paddingHorizontal: spacing.lg, height: 48, ...shadow.sm },
  searchIcon: { fontSize: 16, marginRight: spacing.sm },
  searchInput: { flex: 1, fontSize: fontSize.md, color: colors.text },
  categoriesRow: { flexDirection: 'row', paddingHorizontal: spacing.lg, marginTop: spacing.xl, paddingBottom: spacing.sm },
  categoryItem: { alignItems: 'center', marginRight: spacing.lg, width: 64 },
  categoryIcon: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  categoryEmoji: { fontSize: 24 },
  categoryName: { fontSize: fontSize.xs, color: colors.text, marginTop: spacing.xs, fontWeight: '600', textAlign: 'center' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.xl, marginTop: spacing.xxl, marginBottom: spacing.md },
  sectionTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text },
  seeAll: { fontSize: fontSize.sm, color: colors.primary, fontWeight: '600' },
  offersList: { paddingLeft: spacing.xl, marginBottom: spacing.sm },
  offerCard: { width: 200, padding: spacing.lg, borderRadius: borderRadius.xl, marginRight: spacing.md, paddingVertical: spacing.xl },
  offerTitle: { fontSize: fontSize.lg, fontWeight: '800' },
  offerSubtitle: { fontSize: fontSize.sm, marginTop: spacing.xs, opacity: 0.9 },
  offerBtn: { marginTop: spacing.md },
  offerBtnText: { fontSize: fontSize.sm, fontWeight: '700' },
  deitiesList: { paddingLeft: spacing.xl, marginBottom: spacing.sm },
  deityCard: { width: 72, height: 88, borderRadius: borderRadius.lg, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  deityIcon: { fontSize: 28 },
  deityName: { fontSize: fontSize.xs, fontWeight: '600', color: colors.text, marginTop: spacing.xs },
  pujasList: { paddingHorizontal: spacing.xl },
});
