import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import { useAuthStore } from '../../store';

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

export default function ProfileScreen() {
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
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(user?.name || 'D')[0].toUpperCase()}</Text>
          </View>
          <Text style={styles.name}>{user?.name || 'Devotee'}</Text>
          <Text style={styles.phone}>+91 {user?.phone || '9876543210'}</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}><Text style={styles.statNum}>12</Text><Text style={styles.statLabel}>Bookings</Text></View>
            <View style={styles.stat}><Text style={styles.statNum}>4</Text><Text style={styles.statLabel}>Yatras</Text></View>
            <View style={styles.stat}><Text style={styles.statNum}>★ 4.8</Text><Text style={styles.statLabel}>Rating</Text></View>
          </View>
        </View>
        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => {
                if (item.id === 'bookings') navigation.navigate('MyBookings');
                else if (item.id === 'family') navigation.navigate('FamilyMembers');
                else if (item.id === 'yatras') navigation.navigate('YatraList');
                else if (item.id === 'donations') {/* navigate to donations */}
              }}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <View style={styles.menuInfo}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  profileHeader: { alignItems: 'center', paddingVertical: spacing.xxl },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  avatarText: { fontSize: 36, fontWeight: '700', color: colors.white },
  name: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.text },
  phone: { fontSize: fontSize.md, color: colors.textSecondary, marginTop: 2 },
  statsRow: { flexDirection: 'row', marginTop: spacing.xl, gap: spacing.xl },
  stat: { alignItems: 'center' },
  statNum: { fontSize: fontSize.xl, fontWeight: '800', color: colors.primary },
  statLabel: { fontSize: fontSize.xs, color: colors.textSecondary, marginTop: 2 },
  menuSection: { marginHorizontal: spacing.xl },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.sm, ...shadow.sm },
  menuIcon: { fontSize: 24, marginRight: spacing.md },
  menuInfo: { flex: 1 },
  menuTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  menuSubtitle: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  menuArrow: { fontSize: 18, color: colors.textLight },
  logoutBtn: { marginHorizontal: spacing.xl, marginTop: spacing.xl, padding: spacing.lg, borderRadius: borderRadius.lg, borderWidth: 1.5, borderColor: colors.error, alignItems: 'center' },
  logoutBtnText: { fontSize: fontSize.md, fontWeight: '700', color: colors.error },
});
