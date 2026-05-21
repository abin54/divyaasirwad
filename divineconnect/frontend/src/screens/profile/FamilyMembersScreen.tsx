import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';

export default function FamilyMembersScreen() {
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
      <Header title="Family Members" />
      <FlatList
        data={members}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.memberCard}>
            <View style={styles.avatarSmall}><Text style={styles.avatarSmallText}>{item.name[0]}</Text></View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{item.name}</Text>
              <Text style={styles.memberMeta}>{item.relation}{item.gotra ? ` • Gotra: ${item.gotra}` : ''}</Text>
            </View>
            <TouchableOpacity><Text style={styles.editBtn}>Edit</Text></TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <View style={{ paddingTop: spacing.lg }}>
            {showForm ? (
              <View style={styles.form}>
                <TextInput style={styles.input} placeholder="Full Name" value={newMember.name} onChangeText={(t) => setNewMember({ ...newMember, name: t })} />
                <TextInput style={styles.input} placeholder="Relation (Spouse, Son, etc.)" value={newMember.relation} onChangeText={(t) => setNewMember({ ...newMember, relation: t })} />
                <TextInput style={styles.input} placeholder="Gotra (optional)" value={newMember.gotra} onChangeText={(t) => setNewMember({ ...newMember, gotra: t })} />
                <View style={styles.formBtns}>
                  <Button title="Add Member" onPress={addMember} size="md" disabled={!newMember.name} />
                  <TouchableOpacity onPress={() => setShowForm(false)} style={{ padding: spacing.md }}><Text style={styles.cancelBtn}>Cancel</Text></TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity style={styles.addBtn} onPress={() => setShowForm(true)}>
                <Text style={styles.addBtnText}>+ Add Family Member</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  list: { padding: spacing.xl },
  memberCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.sm, ...shadow.sm },
  avatarSmall: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.saffronLight, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  avatarSmallText: { fontSize: fontSize.xl, fontWeight: '700', color: colors.primary },
  memberInfo: { flex: 1 },
  memberName: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  memberMeta: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  editBtn: { fontSize: fontSize.sm, color: colors.primary, fontWeight: '600' },
  form: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, ...shadow.sm },
  input: { backgroundColor: colors.offWhite, borderRadius: borderRadius.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, fontSize: fontSize.md, color: colors.text, marginBottom: spacing.sm },
  formBtns: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
  cancelBtn: { fontSize: fontSize.md, color: colors.textSecondary, marginLeft: spacing.lg },
  addBtn: { alignItems: 'center', padding: spacing.lg, borderWidth: 2, borderStyle: 'dashed', borderColor: colors.primaryLight, borderRadius: borderRadius.lg },
  addBtnText: { fontSize: fontSize.md, color: colors.primary, fontWeight: '600' },
});
