import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import Header from '../../components/common/Header';

const NOTIFICATIONS = [
  { id: '1', type: 'booking_confirmation', title: 'Booking Confirmed', body: 'Your Satyanarayan Puja has been confirmed for Jan 15.', time: '2 hours ago', read: false, icon: '✅' },
  { id: '2', type: 'puja_completed', title: 'Puja Completed', body: 'Your Rudrabhishek has been completed. View photos now.', time: '1 day ago', read: false, icon: '🕉️' },
  { id: '3', type: 'festival_reminder', title: 'Upcoming: Makar Sankranti', body: 'Book your puja for Makar Sankranti. Special offers available.', time: '2 days ago', read: true, icon: '🎉' },
  { id: '4', type: 'prasad_dispatched', title: 'Prasad Dispatched', body: 'Your prasad has been dispatched. Tracking: DC123456.', time: '3 days ago', read: true, icon: '📦' },
  { id: '5', type: 'offer_available', title: 'Shravan Special Offer', body: 'Get 20% off on all Rudrabhishek bookings this month!', time: '5 days ago', read: true, icon: '🏷️' },
  { id: '6', type: 'review_request', title: 'Rate Your Experience', body: 'How was your Lakshmi Puja? Share your review.', time: '1 week ago', read: true, icon: '⭐' },
];

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title={`Notifications${unreadCount > 0 ? ` (${unreadCount})` : ''}`} />
      <FlatList
        data={notifications}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.notifCard, !item.read && styles.notifCardUnread]}
            onPress={() => markRead(item.id)}
          >
            <View style={styles.notifIconContainer}>
              <Text style={styles.notifIcon}>{item.icon}</Text>
            </View>
            <View style={styles.notifInfo}>
              <Text style={[styles.notifTitle, !item.read && styles.notifTitleUnread]}>{item.title}</Text>
              <Text style={styles.notifBody} numberOfLines={2}>{item.body}</Text>
              <Text style={styles.notifTime}>{item.time}</Text>
            </View>
            {!item.read && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  list: { padding: spacing.xl },
  notifCard: { flexDirection: 'row', backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md, ...shadow.sm },
  notifCardUnread: { backgroundColor: colors.goldLight, borderWidth: 1, borderColor: colors.primaryLight },
  notifIconContainer: { width: 44, height: 44, borderRadius: borderRadius.full, backgroundColor: colors.offWhite, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  notifIcon: { fontSize: 22 },
  notifInfo: { flex: 1 },
  notifTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  notifTitleUnread: { fontWeight: '700', color: colors.primary },
  notifBody: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 4, lineHeight: 20 },
  notifTime: { fontSize: fontSize.xs, color: colors.textLight, marginTop: 4 },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary, alignSelf: 'flex-start', marginTop: 8 },
});
