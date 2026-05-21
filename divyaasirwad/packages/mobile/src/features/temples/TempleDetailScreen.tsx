import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text as DSText, Card } from '@divyaasirwad/design-system';

export function TempleDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();

  const temple = {
    name: 'Shri Kashi Vishwanath Temple', nameHi: 'श्री काशी विश्वनाथ मंदिर',
    location: 'Varanasi, Uttar Pradesh', rating: 4.8, reviews: 12453,
    description: 'One of the most famous Hindu temples dedicated to Lord Shiva, located in the holy city of Varanasi. The temple stands on the western bank of the holy river Ganges and is one of the twelve Jyotirlingas.',
    timings: '4:00 AM - 11:00 PM',
    aartiTimings: [{ name: 'Mangala Aarti', time: '4:00 AM' }, { name: 'Bhoga Aarti', time: '12:00 PM' }, { name: 'Sandhya Aarti', time: '7:00 PM' }, { name: 'Shayan Aarti', time: '10:30 PM' }],
    deity: 'Shiva', type: 'Jyotirlinga',
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView>
        <View style={styles.banner}>
          <Text style={styles.bannerEmoji}>🛕</Text>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <DSText variant="heading" weight="extrabold">{temple.name}</DSText>
              <DSText variant="caption" color="#6B7280">{temple.nameHi}</DSText>
              <DSText variant="caption" color="#6B7280">📍 {temple.location}</DSText>
            </View>
            <View style={styles.ratingBadge}>
              <DSText variant="label" weight="extrabold" color="#FF6F00">★ {temple.rating}</DSText>
              <DSText variant="caption" color="#6B7280">{temple.reviews.toLocaleString()} reviews</DSText>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}><DSText variant="caption" color="#6B7280">Deity</DSText><DSText variant="label" weight="bold">{temple.deity}</DSText></View>
            <View style={styles.infoItem}><DSText variant="caption" color="#6B7280">Type</DSText><DSText variant="label" weight="bold">{temple.type}</DSText></View>
            <View style={styles.infoItem}><DSText variant="caption" color="#6B7280">Timings</DSText><DSText variant="label" weight="bold">{temple.timings}</DSText></View>
          </View>

          <DSText variant="subheading" weight="bold" style={styles.sectionTitle}>About</DSText>
          <DSText variant="body" color="#6B7280">{temple.description}</DSText>

          <DSText variant="subheading" weight="bold" style={styles.sectionTitle}>Aarti Timings</DSText>
          {temple.aartiTimings.map((aarti, i) => (
            <View key={i} style={styles.aartiRow}>
              <DSText variant="label" weight="semibold">🪔 {aarti.name}</DSText>
              <DSText variant="label" weight="bold" color="#FF6F00">{aarti.time}</DSText>
            </View>
          ))}
          <View style={{ height: 120 }} />
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <View><DSText variant="caption" color="#6B7280">Puja starting from</DSText><DSText variant="heading" weight="extrabold" color="#FF6F00">₹1,100</DSText></View>
        <Button title="Book Puja" onPress={() => navigation.navigate('SelectRitual', { templeId: route.params.slug })} size="md" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  banner: { height: 220, backgroundColor: '#FFE0B2', alignItems: 'center', justifyContent: 'center' },
  bannerEmoji: { fontSize: 80 },
  backBtn: { position: 'absolute', top: 16, left: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 24, color: '#FFFFFF' },
  content: { padding: 16 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  ratingBadge: { backgroundColor: '#FFF8E1', padding: 8, borderRadius: 12, alignItems: 'center', minWidth: 80 },
  infoRow: { flexDirection: 'row', backgroundColor: '#FFFBF0', borderRadius: 12, padding: 16, marginTop: 16, justifyContent: 'space-between' },
  infoItem: { alignItems: 'center' },
  sectionTitle: { marginTop: 24, marginBottom: 8 },
  aartiRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: 16, borderTopWidth: 1, borderTopColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
});
