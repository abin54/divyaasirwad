import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text as DSText, Card } from '@divyaasirwad/design-system';

const YATRA_DETAILS: Record<string, {
  name: string;
  nameHi: string;
  description: string;
  duration: { days: number; nights: number };
  price: number;
  rating: number;
  highlights: string[];
  itinerary: Array<{ day: number; title: string; description: string; activities: string[] }>;
  inclusions: string[];
  exclusions: string[];
}> = {
  '1': {
    name: 'Char Dham Yatra',
    nameHi: 'चार धाम यात्रा',
    description: 'A holy pilgrimage encompassing the four sacred abodes of Uttarakhand: Yamunotri, Gangotri, Kedarnath, and Badrinath. It is believed that undertaking this yatra helps in achieving moksha (liberation).',
    duration: { days: 12, nights: 11 },
    price: 15000,
    rating: 4.8,
    highlights: ['Yamunotri Darshan', 'Gangotri Snan', 'Kedarnath Trek & Puja', 'Badrinath Maha Aarti'],
    itinerary: [
      { day: 1, title: 'Arrival in Haridwar', description: 'Arrive in Haridwar, attend the famous Ganga Aarti at Har Ki Pauri and check-in to your hotel.', activities: ['Ganga Aarti', 'Tour briefing'] },
      { day: 2, title: 'Haridwar to Barkot', description: 'Drive to Barkot via Mussoorie. Enjoy the beautiful Kempty falls on the way.', activities: ['Scenic drive', 'Sightseeing'] },
      { day: 3, title: 'Yamunotri Darshan', description: 'Early morning trek of 6 km to Yamunotri. Take a holy dip in Garam Kund and perform Puja.', activities: ['Trek', 'Snan', 'Puja'] },
      { day: 4, title: 'Barkot to Uttarkashi', description: 'Drive to Uttarkashi. Visit the famous Vishwanath Temple in the evening.', activities: ['Drive', 'Temple visit'] },
    ],
    inclusions: ['Semi-Sleeper AC Bus', 'Standard Hotel Accommodation (Double sharing)', 'Pure Veg Breakfast, Lunch & Dinner', 'VIP Darshan Assist', 'Certified Tour Guide'],
    exclusions: ['Helicopter tickets for Kedarnath', 'Pony/Palki charges', 'Personal laundry & telephone charges', 'Tips and gratuities'],
  },
  '2': {
    name: 'Kashi Yatra',
    nameHi: 'काशी यात्रा',
    description: 'Embark on a mystical journey to Varanasi, one of the oldest continually inhabited cities in the world. Witness the eternal Ganga Aarti and seek blessings of Lord Shiva at Kashi Vishwanath.',
    duration: { days: 5, nights: 4 },
    price: 8500,
    rating: 4.7,
    highlights: ['Kashi Vishwanath VIP Darshan', 'Subah-e-Banaras Boat Ride', 'Ganga Aarti Experience', 'Sarnath Buddhist Ruins'],
    itinerary: [
      { day: 1, title: 'Arrival in Varanasi', description: 'Arrive in Varanasi, transfer to hotel. Evening boat ride to witness Ganga Aarti.', activities: ['Boat Ride', 'Ganga Aarti'] },
      { day: 2, title: 'Kashi Vishwanath & Temple Tour', description: 'Early morning VIP Darshan at Kashi Vishwanath, followed by visits to Kaal Bhairav and Sankat Mochan.', activities: ['VIP Darshan', 'Temple Tour'] },
      { day: 3, title: 'Sarnath Excursion', description: 'Excursion to Sarnath, where Lord Buddha gave his first sermon. Visit Dhamek Stupa.', activities: ['Buddhist ruins', 'Museum visit'] },
    ],
    inclusions: ['AC Cab Transfer', 'Deluxe Hotel Accommodation', 'Daily Breakfast & Dinner', 'Private Boat Charter', 'Purohit charges for special Sankalp Puja'],
    exclusions: ['Air/Train fare to Varanasi', 'Lunch and personal expenses', 'Monument entry tickets'],
  },
};

export function YatraDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const slug = route.params?.slug || '1';
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'reviews'>('itinerary');
  const [activePackage, setActivePackage] = useState<'standard' | 'deluxe' | 'luxury'>('standard');

  const yatra = YATRA_DETAILS[slug] || YATRA_DETAILS['1'];

  const getPackagePrice = (pkg: 'standard' | 'deluxe' | 'luxury') => {
    if (pkg === 'standard') return yatra.price;
    if (pkg === 'deluxe') return Math.round(yatra.price * 1.4);
    return Math.round(yatra.price * 1.9);
  };

  const getPackageBadge = (pkg: 'standard' | 'deluxe' | 'luxury') => {
    if (pkg === 'standard') return 'Bus + Std Hotel';
    if (pkg === 'deluxe') return 'Train/Cab + 3★ Hotel';
    return 'Flight/VIP Cab + 4★ Luxury Hotel';
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner header */}
        <View style={styles.imageHeader}>
          <Text style={styles.largeIcon}>🚌</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { top: insets.top + 8 }]}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Title */}
          <DSText variant="heading" weight="extrabold">{yatra.name}</DSText>
          <DSText variant="caption" color="#FF6F00" weight="bold" style={styles.subtext}>
            {yatra.nameHi} • 📍 Uttarakhand • ★ {yatra.rating}
          </DSText>

          <View style={styles.durRow}>
            <View style={styles.durTag}>
              <DSText variant="caption" color="#4B5563" weight="semibold">⏱ {yatra.duration.days} Days / {yatra.duration.nights} Nights</DSText>
            </View>
            <View style={[styles.durTag, { backgroundColor: '#E0F7FA' }]}>
              <DSText variant="caption" color="#006064" weight="semibold">🍀 Vegetarian Meals Included</DSText>
            </View>
          </View>

          <DSText variant="caption" color="#4B5563" style={styles.description}>
            {yatra.description}
          </DSText>

          {/* Highlights */}
          <DSText variant="subheading" weight="bold" style={styles.sectionTitle}>Yatra Highlights 🌟</DSText>
          <View style={styles.highlightsGrid}>
            {yatra.highlights.map((h, i) => (
              <View key={i} style={styles.highlightItem}>
                <Text style={styles.bulletSymbol}>🕉</Text>
                <DSText variant="caption" color="#1A1A1A" weight="medium" style={styles.bulletText}>{h}</DSText>
              </View>
            ))}
          </View>

          {/* Package tier options */}
          <DSText variant="subheading" weight="bold" style={styles.sectionTitle}>Select Comfort Category 🛌</DSText>
          <View style={styles.packageTabs}>
            {(['standard', 'deluxe', 'luxury'] as const).map((pkg) => (
              <TouchableOpacity
                key={pkg}
                style={[styles.packageTab, activePackage === pkg && styles.packageTabSelected]}
                onPress={() => setActivePackage(pkg)}
              >
                <DSText variant="caption" weight="bold" color={activePackage === pkg ? '#FFFFFF' : '#1A1A1A'} style={styles.tabTitle}>
                  {pkg.toUpperCase()}
                </DSText>
                <DSText variant="caption" weight="semibold" color={activePackage === pkg ? '#FFFFFF' : '#FF6F00'}>
                  ₹{getPackagePrice(pkg).toLocaleString()}
                </DSText>
              </TouchableOpacity>
            ))}
          </View>

          <Card style={styles.inclusionsSummaryCard}>
            <DSText variant="caption" color="#FF6F00" weight="bold">Included in {activePackage.toUpperCase()}:</DSText>
            <DSText variant="caption" color="#4B5563" style={styles.inclusionSummaryText}>
              ✓ {getPackageBadge(activePackage)}
            </DSText>
          </Card>

          {/* Tab Selector */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity style={[styles.tab, activeTab === 'itinerary' && styles.tabActive]} onPress={() => setActiveTab('itinerary')}>
              <DSText variant="caption" weight="bold" color={activeTab === 'itinerary' ? '#FF6F00' : '#4B5563'}>Itinerary</DSText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, activeTab === 'inclusions' && styles.tabActive]} onPress={() => setActiveTab('inclusions')}>
              <DSText variant="caption" weight="bold" color={activeTab === 'inclusions' ? '#FF6F00' : '#4B5563'}>Inclusions</DSText>
            </TouchableOpacity>
          </View>

          {activeTab === 'itinerary' && (
            <View style={styles.tabContent}>
              {yatra.itinerary.map((day) => (
                <View key={day.day} style={styles.dayItem}>
                  <View style={styles.dayHeader}>
                    <View style={styles.dayBadge}><DSText variant="caption" color="#FFFFFF" weight="bold">Day {day.day}</DSText></View>
                    <DSText variant="label" weight="bold" style={styles.dayTitle}>{day.title}</DSText>
                  </View>
                  <DSText variant="caption" color="#6B7280" style={styles.dayDesc}>{day.description}</DSText>
                  <View style={styles.actRow}>
                    {day.activities.map((act, i) => (
                      <View key={i} style={styles.actChip}><DSText variant="caption" color="#6B7280">{act}</DSText></View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {activeTab === 'inclusions' && (
            <View style={styles.tabContent}>
              <DSText variant="label" weight="bold" color="#1A1A1A">What is Included:</DSText>
              {yatra.inclusions.map((inc, i) => (
                <DSText key={i} variant="caption" color="#4B5563" style={styles.inclusionLine}>✓ {inc}</DSText>
              ))}
              <DSText variant="label" weight="bold" color="#DC2626" style={{ marginTop: 16 }}>What is Excluded:</DSText>
              {yatra.exclusions.map((exc, i) => (
                <DSText key={i} variant="caption" color="#4B5563" style={styles.inclusionLine}>✗ {exc}</DSText>
              ))}
            </View>
          )}

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Persistent CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.priceSummary}>
          <DSText variant="caption" color="#6B7280">Total Yatra Fare</DSText>
          <DSText variant="heading" weight="extrabold" color="#FF6F00">
            ₹{getPackagePrice(activePackage).toLocaleString()}/-
          </DSText>
        </View>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => {
            navigation.navigate('PaymentScreen', { amount: getPackagePrice(activePackage), type: 'yatra', title: yatra.name });
          }}
        >
          <DSText variant="label" weight="bold" color="#FFFFFF">Book Sacred Journey</DSText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  imageHeader: { height: 180, backgroundColor: '#FFE0B2', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  largeIcon: { fontSize: 80 },
  backBtn: { position: 'absolute', left: 16, backgroundColor: 'rgba(255,255,255,0.8)', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 22, color: '#FF6F00', fontWeight: 'bold' },
  content: { padding: 16 },
  subtext: { marginTop: 4 },
  durRow: { flexDirection: 'row', marginTop: 8, gap: 8 },
  durTag: { backgroundColor: '#FFF3E0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  description: { lineHeight: 18, marginTop: 12, marginBottom: 16 },
  sectionTitle: { marginTop: 20, marginBottom: 8 },
  highlightsGrid: { backgroundColor: '#FFFFFF', padding: 12, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  highlightItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  bulletSymbol: { marginRight: 8, fontSize: 12, color: '#FF6F00' },
  bulletText: { flex: 1 },
  packageTabs: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, marginBottom: 8 },
  packageTab: { flex: 1, backgroundColor: '#FFFFFF', padding: 12, borderRadius: 12, marginHorizontal: 4, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  packageTabSelected: { backgroundColor: '#FF6F00', borderColor: '#FF6F00' },
  tabTitle: { marginBottom: 2 },
  inclusionsSummaryCard: { backgroundColor: '#FFFFFF', padding: 12, borderRadius: 12, marginTop: 4, marginBottom: 16, borderWidth: 1, borderColor: '#FFE0B2' },
  inclusionSummaryText: { color: '#4B5563', marginTop: 2 },
  tabsContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', marginBottom: 16 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: '#FF6F00' },
  tabContent: { paddingHorizontal: 4 },
  dayItem: { marginBottom: 16, borderLeftWidth: 2, borderLeftColor: '#FFE0B2', paddingLeft: 12 },
  dayHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  dayBadge: { backgroundColor: '#FF6F00', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginRight: 8 },
  dayTitle: { flex: 1, fontSize: 15, color: '#1A1A1A' },
  dayDesc: { lineHeight: 16 },
  actRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 6 },
  actChip: { backgroundColor: '#FFFFFF', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, borderWidth: 1, borderColor: '#E5E7EB' },
  inclusionLine: { marginTop: 4 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceSummary: { flex: 1 },
  bookBtn: { flex: 2, backgroundColor: '#FF6F00', borderRadius: 12, paddingVertical: 14, alignItems: 'center', justifyContent: 'center', marginLeft: 16 },
});
