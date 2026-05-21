import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text as DSText } from '@divyaasirwad/design-system';

const NOTIFICATIONS = [
  { id: '1', type: 'booking_confirmation', title: 'Booking Confirmed', body: 'Your Satyanarayan Puja has been confirmed for Jan 15.', time: '2 hours ago', read: false, icon: '✅' },
  { id: '2', type: 'puja_completed', title: 'Puja Completed', body: 'Your Rudrabhishek has been completed. View photos now.', time: '1 day ago', read: false, icon: '🕉️' },
  { id: '3', type: 'festival_reminder', title: 'Upcoming: Makar Sankranti', body: 'Book your puja for Makar Sankranti. Special offers available.', time: '2 days ago', read: true, icon: '🎉' },
  { id: '4', type: 'prasad_dispatched', title: 'Prasad Dispatched', body: 'Your prasad has been dispatched. Tracking: DC123456.', time: '3 days ago', read: true, icon: '📦' },
];

export function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}} style={styles.backBtn}><Text style={styles.backText}>←</Text></TouchableOpacity>
        <DSText variant="heading" weight="extrabold">Notifications{unreadCount > 0 ? ` (${unreadCount})` : ''}</DSText>
      </View>
      <FlatList data={notifications} contentContainerStyle={styles.list} renderItem={({ item }) => (
        <TouchableOpacity style={[styles.notifCard, !item.read && styles.notifCardUnread]} onPress={() => markRead(item.id)}>
          <View style={styles.notifIconContainer}><Text style={styles.notifIcon}>{item.icon}</Text></View>
          <View style={styles.notifInfo}>
            <DSText variant="label" weight={item.read ? 'semibold' : 'bold'} color={item.read ? '#1A1A1A' : '#FF6F00'}>{item.title}</DSText>
            <DSText variant="caption" color="#6B7280" numberOfLines={2}>{item.body}</DSText>
            <DSText variant="caption" color="#9CA3AF">{item.time}</DSText>
          </View>
          {!item.read && <View style={styles.unreadDot} />}
        </TouchableOpacity>
      )} keyExtractor={(item) => item.id} showsVerticalScrollIndicator={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { marginBottom: 8 },
  backText: { fontSize: 24, color: '#FF6F00' },
  list: { padding: 16 },
  notifCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  notifCardUnread: { backgroundColor: '#FFF8E1', borderWidth: 1, borderColor: '#FFB300' },
  notifIconContainer: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFBF0', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  notifIcon: { fontSize: 22 },
  notifInfo: { flex: 1 },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF6F00', alignSelf: 'flex-start', marginTop: 8 },
});
