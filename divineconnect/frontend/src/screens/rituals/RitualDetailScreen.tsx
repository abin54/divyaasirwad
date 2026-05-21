import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import Button from '../../components/common/Button';

export default function RitualDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const { slug } = route.params;
  const [selectedPkg, setSelectedPkg] = useState('standard');

  const ritual = {
    name: 'Satyanarayan Puja', nameHi: 'सत्यनारायण पूजा', icon: '📿',
    description: 'Satyanarayan Puja is a sacred ritual dedicated to Lord Vishnu, the preserver of the universe. It brings prosperity, peace, and happiness to the family.',
    benefits: ['Prosperity & Wealth', 'Peace & Harmony', 'Family Well-being', 'Removal of Obstacles', 'Divine Blessings'],
    samagri: ['Fruits', 'Flowers', 'Betel leaves', 'Coconuts', 'Panchamrit', 'Incense sticks', 'Ghee lamp', 'Tilak'],
    pricing: { basic: 1100, standard: 2100, premium: 5100 },
    duration: { basic: 60, standard: 120, premium: 180 },
    includes: {
      basic: ['Mantra chanting', 'Basic puja samagri', 'Brief sankalp'],
      standard: ['Extended Vedic chanting', 'Premium samagri', 'Sankalp with family names', 'Photo proof'],
      premium: ['Complete vidhi', 'Premium samagri', 'Full sankalp', 'Video recording', 'Prasad delivery'],
    },
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView>
        <View style={styles.banner}><Text style={styles.bannerIcon}>{ritual.icon}</Text></View>
        <View style={styles.content}>
          <Text style={styles.title}>{ritual.name}</Text>
          <Text style={styles.titleHi}>{ritual.nameHi}</Text>
          <Text style={styles.description}>{ritual.description}</Text>

          <Text style={styles.sectionTitle}>✨ Benefits</Text>
          {ritual.benefits.map((b, i) => <Text key={i} style={styles.bullet}>✓ {b}</Text>)}

          <Text style={styles.sectionTitle}>📦 Puja Samagri</Text>
          <Text style={styles.samagriText}>{ritual.samagri.join(', ')}</Text>

          <Text style={styles.sectionTitle}>💰 Select Package</Text>
          {['basic', 'standard', 'premium'].map((pkg) => (
            <TouchableOpacity key={pkg} style={[styles.pkgCard, selectedPkg === pkg && styles.pkgCardActive]} onPress={() => setSelectedPkg(pkg)}>
              <View style={styles.pkgHeader}>
                <Text style={[styles.pkgName, selectedPkg === pkg && { color: colors.primary }]}>{pkg.charAt(0).toUpperCase() + pkg.slice(1)}</Text>
                <Text style={[styles.pkgPrice, selectedPkg === pkg && { color: colors.primary }]}>₹{ritual.pricing[pkg as keyof typeof ritual.pricing]}</Text>
              </View>
              <Text style={styles.pkgDuration}>⏱ {ritual.duration[pkg as keyof typeof ritual.duration]} min</Text>
              {ritual.includes[pkg as keyof typeof ritual.includes].map((inc: string, i: number) => (
                <Text key={i} style={styles.pkgInclude}>✓ {inc}</Text>
              ))}
            </TouchableOpacity>
          ))}
          <View style={{ height: 120 }} />
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <View><Text style={styles.priceFrom}>Starting from</Text><Text style={styles.priceAmt}>₹{ritual.pricing[selectedPkg as keyof typeof ritual.pricing]}</Text></View>
        <Button title="Book This Puja" onPress={() => navigation.navigate('SelectDateTime', { ritualId: slug, packageType: selectedPkg })} size="sm" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  banner: { height: 180, backgroundColor: colors.saffronLight, alignItems: 'center', justifyContent: 'center' },
  bannerIcon: { fontSize: 64 },
  content: { padding: spacing.xl },
  title: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.text },
  titleHi: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  description: { fontSize: fontSize.md, color: colors.textSecondary, lineHeight: 24, marginTop: spacing.md },
  sectionTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text, marginTop: spacing.xxl, marginBottom: spacing.md },
  bullet: { fontSize: fontSize.md, color: colors.textSecondary, marginBottom: spacing.xs, paddingLeft: spacing.sm },
  samagriText: { fontSize: fontSize.md, color: colors.textSecondary, lineHeight: 22 },
  pkgCard: { backgroundColor: colors.offWhite, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md, borderWidth: 2, borderColor: 'transparent' },
  pkgCardActive: { borderColor: colors.primary, backgroundColor: colors.goldLight },
  pkgHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pkgName: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text },
  pkgPrice: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.text },
  pkgDuration: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs },
  pkgInclude: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.white, padding: spacing.lg, ...shadow.lg, borderTopWidth: 1, borderTopColor: colors.borderLight },
  priceFrom: { fontSize: fontSize.xs, color: colors.textSecondary },
  priceAmt: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.primary },
});
