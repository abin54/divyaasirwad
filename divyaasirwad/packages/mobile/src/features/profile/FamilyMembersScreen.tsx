import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text as DSText, Button, Input } from '@divyaasirwad/design-system';

export function FamilyMembersScreen() {
  const insets = useSafeAreaInsets();
  const [members, setMembers] = useState([
    { id: '1', name: 'Rahul Sharma', relation: 'Self', gotra: 'Kashyap' },
    { id: '2', name: 'Anita Sharma', relation: 'Spouse', gotra: 'Kashyap' },
    { id: '3', name: 'Aarav Sharma', relation: 'Son', gotra: '' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', relation: '', gotra: '' });

  const addMember = () => {
    if (newMember.name) {
      setMembers([...members, { ...newMember, id: Date.now().toString() }]);
      setNewMember({ name: '', relation: '', gotra: '' });
      setShowForm(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}} style={styles.backBtn}><Text style={styles.backText}>←</Text></TouchableOpacity>
        <DSText variant="heading" weight="extrabold">Family Members</DSText>
      </View>
      <FlatList data={members} contentContainerStyle={styles.list} renderItem={({ item }) => (
        <View style={styles.memberCard}>
          <View style={styles.avatarSmall}><DSText variant="subheading" weight="bold" color="#FF6F00">{item.name[0]}</DSText></View>
          <View style={styles.memberInfo}>
            <DSText variant="label" weight="semibold">{item.name}</DSText>
            <DSText variant="caption" color="#6B7280">{item.relation}{item.gotra ? ` • Gotra: ${item.gotra}` : ''}</DSText>
          </View>
          <TouchableOpacity><DSText variant="caption" weight="semibold" color="#FF6F00">Edit</DSText></TouchableOpacity>
        </View>
      )} keyExtractor={(item) => item.id} ListFooterComponent={
        <View style={{ paddingTop: 16 }}>
          {showForm ? (
            <View style={styles.form}>
              <Input placeholder="Full Name" value={newMember.name} onChangeText={(t) => setNewMember({ ...newMember, name: t })} />
              <Input placeholder="Relation (Spouse, Son, etc.)" value={newMember.relation} onChangeText={(t) => setNewMember({ ...newMember, relation: t })} />
              <Input placeholder="Gotra (optional)" value={newMember.gotra} onChangeText={(t) => setNewMember({ ...newMember, gotra: t })} />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <Button title="Add Member" onPress={addMember} size="md" disabled={!newMember.name} />
                <TouchableOpacity onPress={() => setShowForm(false)} style={{ padding: 12 }}><DSText variant="label" color="#6B7280">Cancel</DSText></TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.addBtn} onPress={() => setShowForm(true)}>
              <DSText variant="label" weight="semibold" color="#FF6F00">+ Add Family Member</DSText>
            </TouchableOpacity>
          )}
        </View>
      } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { marginBottom: 8 },
  backText: { fontSize: 24, color: '#FF6F00' },
  list: { padding: 16 },
  memberCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  avatarSmall: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFF3E0', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  memberInfo: { flex: 1 },
  form: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  addBtn: { alignItems: 'center', padding: 16, borderWidth: 2, borderStyle: 'dashed', borderColor: '#FFB300', borderRadius: 12 },
});
