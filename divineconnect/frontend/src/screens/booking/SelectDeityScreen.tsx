import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import { DEITIES } from '../../constants/deities';
import Header from '../../components/common/Header';

export default function SelectDeityScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Select Deity" />
      <Text style={styles.subtitle}>Choose a deity for your puja</Text>
      <FlatList
        data={DEITIES}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate('SelectTemple', { deityId: item.id })}
            activeOpacity={0.8}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.nameHi}>{item.nameHi}</Text>
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
  list: { paddingHorizontal: spacing.lg, paddingBottom: 100 },
  card: { flex: 1, margin: spacing.sm, padding: spacing.xl, borderRadius: borderRadius.xl, alignItems: 'center', justifyContent: 'center', minHeight: 120, ...shadow.sm },
  icon: { fontSize: 40, marginBottom: spacing.sm },
  name: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text },
  nameHi: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
});
