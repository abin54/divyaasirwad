import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text as DSText, Card } from '@divyaasirwad/design-system';
import { RITUALS, DEITIES, formatCurrency } from '@divyaasirwad/shared';

export function RitualDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const slug = route.params?.slug;
  const [activePackage, setActivePackage] = useState<'basic' | 'standard' | 'premium'>('standard');

  const ritual = RITUALS.find((r) => r.slug === slug) || RITUALS[0];
  const associatedDeity = DEITIES.find((d) => d.id === ritual.deityId);

  const getPackageIncludes = (pkg: 'basic' | 'standard' | 'premium') => {
    if (pkg === 'basic') return ritual.includes;
    if (pkg === 'standard') return [...ritual.includes, 'Photo proofs of Puja', 'Extended Mantra recitations'];
    return [...ritual.includes, 'Live Streaming of Puja', 'Prasad delivered to your home', 'Complete Samagri kit'];
  };

  const getPackagePrice = (pkg: 'basic' | 'standard' | 'premium') => {
    return ritual.pricing[pkg];
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner Image Placeholder */}
        <View style={styles.imageHeader}>
          <Text style={styles.largeIcon}>{ritual.icon}</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { top: insets.top + 8 }]}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Title Section */}
          <DSText variant="heading" weight="extrabold">{ritual.name}</DSText>
          <View style={styles.metaRow}>
            {associatedDeity && (
              <View style={styles.tag}>
                <DSText variant="caption" color="#FF6F00" weight="bold">🪘 Lord {associatedDeity.name}</DSText>
              </View>
            )}
            <View style={[styles.tag, { backgroundColor: '#E0F7FA' }]}>
              <DSText variant="caption" color="#006064" weight="bold">⏱ {ritual.duration[activePackage]} mins</DSText>
            </View>
          </View>

          <DSText variant="caption" color="#6B7280" style={styles.description}>
            {ritual.description}
          </DSText>

          {/* Benefits Section */}
          <DSText variant="subheading" weight="bold" style={styles.sectionTitle}>Benefits of this Puja 🌟</DSText>
          <Card style={styles.card}>
            {ritual.benefits.map((benefit, idx) => (
              <View key={idx} style={styles.bulletRow}>
                <Text style={styles.bulletPoint}>☀️</Text>
                <DSText variant="caption" color="#1A1A1A" style={styles.bulletText}>{benefit}</DSText>
              </View>
            ))}
          </Card>

          {/* Packages Selector */}
          <DSText variant="subheading" weight="bold" style={styles.sectionTitle}>Choose Booking Package 💰</DSText>
          <View style={styles.packageTabs}>
            {(['basic', 'standard', 'premium'] as const).map((pkg) => (
              <TouchableOpacity
                key={pkg}
                style={[styles.packageTab, activePackage === pkg && styles.packageTabSelected]}
                onPress={() => setActivePackage(pkg)}
              >
                <DSText variant="caption" weight="bold" color={activePackage === pkg ? '#FFFFFF' : '#1A1A1A'} style={styles.tabText}>
                  {pkg.toUpperCase()}
                </DSText>
                <DSText variant="caption" weight="semibold" color={activePackage === pkg ? '#FFFFFF' : '#6B7280'}>
                  ₹{ritual.pricing[pkg]}
                </DSText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Package details */}
          <Card style={[styles.card, { borderColor: '#FF6F00', borderWidth: 1 }]}>
            <DSText variant="label" weight="bold" color="#FF6F00">Package Inclusions:</DSText>
            {getPackageIncludes(activePackage).map((inc, i) => (
              <DSText key={i} variant="caption" color="#4B5563" style={styles.inclusionItem}>
                ✓ {inc}
              </DSText>
            ))}
          </Card>

          {/* Samagri details */}
          <DSText variant="subheading" weight="bold" style={styles.sectionTitle}>Essential Samagri Required 📦</DSText>
          <View style={styles.samagriGrid}>
            {ritual.samagri.map((item, idx) => (
              <View key={idx} style={styles.samagriItem}>
                <Text style={styles.samagriDot}>🔸</Text>
                <DSText variant="caption" color="#4B5563">{item}</DSText>
              </View>
            ))}
          </View>

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Persistent Bottom Booking CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.priceSummary}>
          <DSText variant="caption" color="#6B7280">Total Price</DSText>
          <DSText variant="heading" weight="extrabold" color="#FF6F00">
            ₹{getPackagePrice(activePackage)}
          </DSText>
        </View>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => {
            // Navigate to SelectTemple with the target deity and package selection
            navigation.navigate('SelectTemple', { deityId: ritual.deityId, ritualId: ritual.id, packageType: activePackage });
          }}
        >
          <DSText variant="label" weight="bold" color="#FFFFFF">Select Temple & Book</DSText>
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
  metaRow: { flexDirection: 'row', marginTop: 8, marginBottom: 16 },
  tag: { backgroundColor: '#FFF3E0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginRight: 8 },
  description: { lineHeight: 18, marginBottom: 20 },
  sectionTitle: { marginTop: 24, marginBottom: 12 },
  card: { padding: 16, backgroundColor: '#FFFFFF', borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  bulletRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  bulletPoint: { marginRight: 8, fontSize: 12 },
  bulletText: { flex: 1 },
  packageTabs: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  packageTab: { flex: 1, backgroundColor: '#FFFFFF', padding: 12, borderRadius: 12, marginHorizontal: 4, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  packageTabSelected: { backgroundColor: '#FF6F00', borderColor: '#FF6F00' },
  tabText: { marginBottom: 2 },
  inclusionItem: { marginTop: 6, paddingLeft: 4 },
  samagriGrid: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  samagriItem: { width: '50%', flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  samagriDot: { marginRight: 6, fontSize: 10 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceSummary: { flex: 1 },
  bookBtn: { flex: 2, backgroundColor: '#FF6F00', borderRadius: 12, paddingVertical: 14, alignItems: 'center', justifyContent: 'center', marginLeft: 16 },
});
