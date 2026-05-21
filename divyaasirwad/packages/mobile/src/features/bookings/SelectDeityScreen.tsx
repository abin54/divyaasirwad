import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text as DSText } from '@divyaasirwad/design-system';
import { DEITIES } from '@divyaasirwad/shared';

export function SelectDeityScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backText}>←</Text></TouchableOpacity>
        <DSText variant="heading" weight="extrabold">Select Deity</DSText>
        <DSText variant="caption" color="#6B7280">Choose a deity for your puja</DSText>
      </View>
      <FlatList
        data={DEITIES}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.card, { backgroundColor: item.color }]} onPress={() => navigation.navigate('SelectTemple', { deityId: item.id })} activeOpacity={0.8}>
            <Text style={styles.icon}>{item.icon}</Text>
            <DSText variant="label" weight="bold">{item.name}</DSText>
            <DSText variant="caption" color="#6B7280">{item.nameHi}</DSText>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { marginBottom: 8 },
  backText: { fontSize: 24, color: '#FF6F00' },
  list: { padding: 12, paddingBottom: 100 },
  card: { flex: 1, margin: 6, padding: 24, borderRadius: 16, alignItems: 'center', justifyContent: 'center', minHeight: 120, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  icon: { fontSize: 40, marginBottom: 8 },
});
