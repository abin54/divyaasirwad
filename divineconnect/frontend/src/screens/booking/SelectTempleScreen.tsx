import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import Header from '../../components/common/Header';

const TEMPLES = [
  { id: '1', name: 'Kashi Vishwanath Temple', city: 'Varanasi', deity: 'Shiva', rating: 4.8 },
  { id: '2', name: 'Banke Bihari Temple', city: 'Vrindavan', deity: 'Krishna', rating: 4.7 },
  { id: '3', name: 'Siddhivinayak Temple', city: 'Mumbai', deity: 'Ganesh', rating: 4.8 },
  { id: '4', name: 'Kali Mandir', city: 'Kolkata', deity: 'Kali', rating: 4.6 },
  { id: '5', name: 'Hanuman Mandir', city: 'Delhi', deity: 'Hanuman', rating: 4.5 },
  { id: '6', name: 'Lakshmi Narayan Temple', city: 'Delhi', deity: 'Lakshmi', rating: 4.6 },
];

export default function SelectTempleScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const { deityId } = route.params;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Select Temple" />
      <Text style={styles.subtitle}>Choose a temple for your puja</Text>
      <FlatList
        data={TEMPLES}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SelectRitual', { templeId: item.id, deityId })} activeOpacity={0.8}>
            <View style={styles.iconContainer}>
              <Text style={styles.emoji}>🛕</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.city}>{item.city}</Text>
              <View style={styles.metaRow}>
                <View style={styles.deityBadge}><Text style={styles.deityText}>{item.deity}</Text></View>
                <Text style={styles.rating}>★ {item.rating}</Text>
              </View>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  subtitle: { paddingHorizontal: spacing.xl, fontSize: fontSize.md, color: colors.textSecondary, marginBottom: spacing.md },
  list: { paddingHorizontal: spacing.xl, paddingBottom: 100 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md, ...shadow.sm },
  iconContainer: { width: 52, height: 52, borderRadius: 16, backgroundColor: colors.saffronLight, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  emoji: { fontSize: 24 },
  info: { flex: 1 },
  name: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  city: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs, gap: spacing.sm },
  deityBadge: { backgroundColor: colors.saffronLight, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
  deityText: { fontSize: fontSize.xs, color: colors.primary, fontWeight: '600' },
  rating: { fontSize: fontSize.sm, color: colors.rating, fontWeight: '600' },
  arrow: { fontSize: 20, color: colors.textLight, marginLeft: spacing.sm },
});
