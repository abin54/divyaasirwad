import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import { RITUALS, PUJA_CATEGORIES } from '../../constants/rituals';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';

const PACKAGES = [
  { id: 'basic', name: 'Basic', nameHi: 'बेसिक', price: '₹1,100', includes: ['Mantra chanting', 'Basic samagri', '30 min duration'] },
  { id: 'standard', name: 'Standard', nameHi: 'स्टैंडर्ड', price: '₹2,100', includes: ['Extended chanting', 'Premium samagri', '60 min duration', 'Photo proof'] },
  { id: 'premium', name: 'Premium', nameHi: 'प्रीमियम', price: '₹5,100', includes: ['Full vidhi', 'Premium samagri', '120 min', 'Video recording', 'Prasad delivery'] },
];

export default function SelectRitualScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRitual, setSelectedRitual] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState('standard');

  const filtered = selectedCategory === 'all' ? RITUALS : RITUALS.filter((r) => r.category === selectedCategory);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Select Ritual & Package" />
      <FlatList
        horizontal showsHorizontalScrollIndicator={false}
        data={[{ id: 'all', label: 'All' }, ...PUJA_CATEGORIES]}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.filterChip, selectedCategory === item.id && styles.filterChipActive]}
            onPress={() => setSelectedCategory(item.id)}
          >
            <Text style={[styles.filterChipText, selectedCategory === item.id && styles.filterChipTextActive]}>{item.label}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.filterList}
      />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {filtered.map((ritual) => (
          <TouchableOpacity
            key={ritual.id}
            style={[styles.ritualCard, selectedRitual === ritual.id && styles.ritualCardSelected]}
            onPress={() => setSelectedRitual(ritual.id)}
          >
            <View style={styles.ritualHeader}>
              <Text style={styles.ritualIcon}>{ritual.icon}</Text>
              <View style={styles.ritualInfo}>
                <Text style={styles.ritualName}>{ritual.name}</Text>
                <Text style={styles.ritualNameHi}>{ritual.nameHi}</Text>
                <Text style={styles.ritualDuration}>⏱ {ritual.duration.basic}-{ritual.duration.premium} min</Text>
              </View>
              <Text style={styles.ritualPrice}>₹{ritual.price.basic}</Text>
            </View>
            <Text style={styles.ritualDesc} numberOfLines={2}>{ritual.description}</Text>
            {selectedRitual === ritual.id && (
              <View style={styles.packageSection}>
                <Text style={styles.packageTitle}>Select Package</Text>
                {PACKAGES.map((pkg) => (
                  <TouchableOpacity
                    key={pkg.id}
                    style={[styles.packageCard, selectedPackage === pkg.id && styles.packageCardSelected]}
                    onPress={() => setSelectedPackage(pkg.id)}
                  >
                    <View style={styles.packageHeader}>
                      <Text style={[styles.packageName, selectedPackage === pkg.id && { color: colors.primary }]}>{pkg.name}</Text>
                      <Text style={[styles.packagePrice, selectedPackage === pkg.id && { color: colors.primary }]}>{pkg.price}</Text>
                    </View>
                    {pkg.includes.map((inc, i) => (
                      <Text key={i} style={styles.packageInclude}>✓ {inc}</Text>
                    ))}
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
          <Button
            title="Continue to Date & Time"
            onPress={() => navigation.navigate('SelectDateTime', { ritualId: selectedRitual, packageType: selectedPackage })}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  filterList: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  filterChip: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.full, backgroundColor: colors.white, marginRight: spacing.sm, ...shadow.sm },
  filterChipActive: { backgroundColor: colors.primary },
  filterChipText: { fontSize: fontSize.sm, color: colors.text, fontWeight: '600' },
  filterChipTextActive: { color: colors.white },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.xl, paddingTop: spacing.sm },
  ritualCard: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md, ...shadow.sm, borderWidth: 2, borderColor: 'transparent' },
  ritualCardSelected: { borderColor: colors.primary },
  ritualHeader: { flexDirection: 'row', alignItems: 'center' },
  ritualIcon: { fontSize: 32, marginRight: spacing.md },
  ritualInfo: { flex: 1 },
  ritualName: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  ritualNameHi: { fontSize: fontSize.xs, color: colors.textSecondary },
  ritualDuration: { fontSize: fontSize.xs, color: colors.textLight, marginTop: 2 },
  ritualPrice: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.primary },
  ritualDesc: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.sm, lineHeight: 20 },
  packageSection: { marginTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.borderLight, paddingTop: spacing.md },
  packageTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.text, marginBottom: spacing.sm },
  packageCard: { backgroundColor: colors.offWhite, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 2, borderColor: 'transparent' },
  packageCardSelected: { borderColor: colors.primary, backgroundColor: colors.goldLight },
  packageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  packageName: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  packagePrice: { fontSize: fontSize.lg, fontWeight: '800', color: colors.text },
  packageInclude: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 4 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.lg, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.borderLight, ...shadow.lg },
});
