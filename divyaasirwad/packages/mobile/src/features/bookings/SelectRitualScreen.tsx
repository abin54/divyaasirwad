import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text as DSText, Card } from '@divyaasirwad/design-system';
import { RITUALS, PUJA_CATEGORIES } from '@divyaasirwad/shared';

const PACKAGES = [
  { id: 'basic', name: 'Basic', price: '₹1,100', includes: ['Mantra chanting', 'Basic samagri', '30 min duration'] },
  { id: 'standard', name: 'Standard', price: '₹2,100', includes: ['Extended chanting', 'Premium samagri', '60 min duration', 'Photo proof'] },
  { id: 'premium', name: 'Premium', price: '₹5,100', includes: ['Full vidhi', 'Premium samagri', '120 min', 'Video recording', 'Prasad delivery'] },
];

export function SelectRitualScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const [selectedRitual, setSelectedRitual] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState('standard');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backText}>←</Text></TouchableOpacity>
        <DSText variant="heading" weight="extrabold">Select Ritual & Package</DSText>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {RITUALS.map((ritual) => (
          <TouchableOpacity key={ritual.id} style={[styles.ritualCard, selectedRitual === ritual.id && styles.ritualCardSelected]} onPress={() => setSelectedRitual(ritual.id)}>
            <View style={styles.ritualHeader}>
              <Text style={styles.ritualIcon}>{ritual.icon}</Text>
              <View style={styles.ritualInfo}>
                <DSText variant="label" weight="bold">{ritual.name}</DSText>
                <DSText variant="caption" color="#6B7280">⏱ {ritual.duration.basic}-{ritual.duration.premium} min</DSText>
              </View>
              <DSText variant="subheading" weight="extrabold" color="#FF6F00">₹{ritual.price.basic}</DSText>
            </View>
            <DSText variant="caption" color="#6B7280" numberOfLines={2}>{ritual.description}</DSText>
            {selectedRitual === ritual.id && (
              <View style={styles.packageSection}>
                <DSText variant="label" weight="bold" style={styles.packageTitle}>Select Package</DSText>
                {PACKAGES.map((pkg) => (
                  <TouchableOpacity key={pkg.id} style={[styles.packageCard, selectedPackage === pkg.id && styles.packageCardSelected]} onPress={() => setSelectedPackage(pkg.id)}>
                    <View style={styles.packageHeader}>
                      <DSText variant="label" weight="bold" color={selectedPackage === pkg.id ? '#FF6F00' : '#1A1A1A'}>{pkg.name}</DSText>
                      <DSText variant="label" weight="extrabold" color={selectedPackage === pkg.id ? '#FF6F00' : '#1A1A1A'}>{pkg.price}</DSText>
                    </View>
                    {pkg.includes.map((inc, i) => <DSText key={i} variant="caption" color="#6B7280">✓ {inc}</DSText>)}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </TouchableOpacity>
        ))}
        <View style={{ height: 120 }} />
      </ScrollView>
      {selectedRitual && (
        <View style={styles.bottomBar}>
          <Button title="Continue to Date & Time" onPress={() => navigation.navigate('SelectDateTime', { ritualId: selectedRitual, packageType: selectedPackage })} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { marginBottom: 8 },
  backText: { fontSize: 24, color: '#FF6F00' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  ritualCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2, borderWidth: 2, borderColor: 'transparent' },
  ritualCardSelected: { borderColor: '#FF6F00' },
  ritualHeader: { flexDirection: 'row', alignItems: 'center' },
  ritualIcon: { fontSize: 32, marginRight: 12 },
  ritualInfo: { flex: 1 },
  packageSection: { marginTop: 12, borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 12 },
  packageTitle: { marginBottom: 8 },
  packageCard: { backgroundColor: '#FFFBF0', borderRadius: 8, padding: 12, marginBottom: 8, borderWidth: 2, borderColor: 'transparent' },
  packageCardSelected: { borderColor: '#FF6F00', backgroundColor: '#FFF8E1' },
  packageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
});
