import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text as DSText } from '@divyaasirwad/design-system';
import { useAuthStore } from '../../shared/store';

const MENU_ITEMS = [
  { id: 'bookings', icon: '📋', title: 'My Bookings', subtitle: 'View all your bookings' },
  { id: 'family', icon: '👨‍👩‍👧‍👦', title: 'Family Members', subtitle: 'Manage devotee details & gotra' },
  { id: 'payments', icon: '💳', title: 'Payment History', subtitle: 'View transaction history' },
  { id: 'notifications', icon: '🔔', title: 'Notifications', subtitle: 'Manage alerts' },
  { id: 'language', icon: '🌐', title: 'Language', subtitle: 'English, हिन्दी, বাংলা' },
  { id: 'yatras', icon: '🚌', title: 'My Yatras', subtitle: 'Pilgrimage bookings' },
  { id: 'donations', icon: '🙏', title: 'My Donations', subtitle: 'Temple donations history' },
  { id: 'settings', icon: '⚙️', title: 'Settings', subtitle: 'App preferences' },
  { id: 'about', icon: 'ℹ️', title: 'About', subtitle: 'Version 1.0.0' },
];

export function ProfileScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => { logout(); navigation.reset({ index: 0, routes: [{ name: 'Login' }] }); } },
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}><DSText variant="display" weight="bold" color="#FFFFFF">{(user?.name || 'D')[0].toUpperCase()}</DSText></View>
          <DSText variant="subheading" weight="extrabold">{user?.name || 'Devotee'}</DSText>
          <DSText variant="body" color="#6B7280">+91 {user?.phone || '9876543210'}</DSText>
          <View style={styles.statsRow}>
            <View style={styles.stat}><DSText variant="subheading" weight="extrabold" color="#FF6F00">12</DSText><DSText variant="caption" color="#6B7280">Bookings</DSText></View>
            <View style={styles.stat}><DSText variant="subheading" weight="extrabold" color="#FF6F00">4</DSText><DSText variant="caption" color="#6B7280">Yatras</DSText></View>
            <View style={styles.stat}><DSText variant="subheading" weight="extrabold" color="#FF6F00">★ 4.8</DSText><DSText variant="caption" color="#6B7280">Rating</DSText></View>
          </View>
        </View>
        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => {
              if (item.id === 'bookings') navigation.navigate('Bookings');
              else if (item.id === 'family') navigation.navigate('FamilyMembers');
              else if (item.id === 'yatras') navigation.navigate('YatraList');
              else if (item.id === 'donations') navigation.navigate('Donations');
              else if (item.id === 'notifications') navigation.navigate('Notifications');
            }}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <View style={styles.menuInfo}>
                <DSText variant="label" weight="semibold">{item.title}</DSText>
                <DSText variant="caption" color="#6B7280">{item.subtitle}</DSText>
              </View>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <DSText variant="label" weight="bold" color="#DC2626">Logout</DSText>
        </TouchableOpacity>
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  profileHeader: { alignItems: 'center', paddingVertical: 32 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FF6F00', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  statsRow: { flexDirection: 'row', marginTop: 24, gap: 32 },
  stat: { alignItems: 'center' },
  menuSection: { marginHorizontal: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  menuIcon: { fontSize: 24, marginRight: 12 },
  menuInfo: { flex: 1 },
  menuArrow: { fontSize: 18, color: '#9CA3AF' },
  logoutBtn: { marginHorizontal: 16, marginTop: 24, padding: 16, borderRadius: 12, borderWidth: 1.5, borderColor: '#DC2626', alignItems: 'center' },
});
