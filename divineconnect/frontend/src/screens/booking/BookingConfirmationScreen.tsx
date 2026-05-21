import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../constants/theme';
import Button from '../../components/common/Button';

export default function BookingConfirmationScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const { bookingId } = route.params;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statusCard}>
          <Text style={styles.statusIcon}>🕉️</Text>
          <Text style={styles.statusTitle}>Booking Confirmed!</Text>
          <Text style={styles.bookingId}>{bookingId}</Text>
          <View style={styles.statusBadge}><Text style={styles.statusBadgeText}>● Confirmed</Text></View>
        </View>

        <View style={styles.timeline}>
          <Text style={styles.timelineTitle}>What happens next?</Text>
          {[ 
            { step: '1', title: 'Confirmation', desc: 'Temple/Pandit confirms your booking', done: true },
            { step: '2', title: 'Preparation', desc: 'Ritual preparations begin', done: false },
            { step: '3', title: 'Puja in Progress', desc: 'Watch live or get updates', done: false },
            { step: '4', title: 'Completion', desc: 'Get photos/videos of the puja', done: false },
            { step: '5', title: 'Prasad Delivery', desc: 'Track your prasad delivery', done: false },
          ].map((item, i) => (
            <View key={i} style={styles.timelineItem}>
              <View style={[styles.timelineDot, item.done && styles.timelineDotDone]}>
                <Text style={styles.timelineStep}>{item.step}</Text>
              </View>
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineTitleStep, item.done && { color: colors.success }]}>{item.title}</Text>
                <Text style={styles.timelineDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <Button title="Go to My Bookings" onPress={() => navigation.navigate('MyBookings')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  content: { padding: spacing.xl },
  statusCard: { backgroundColor: colors.white, borderRadius: borderRadius.xl, padding: spacing.xxl, alignItems: 'center', marginBottom: spacing.xl, ...shadow.md },
  statusIcon: { fontSize: 56, marginBottom: spacing.md },
  statusTitle: { fontSize: fontSize.xxl, fontWeight: '800', color: colors.text },
  bookingId: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs, fontFamily: 'monospace' },
  statusBadge: { marginTop: spacing.md, backgroundColor: colors.success + '20', paddingHorizontal: spacing.lg, paddingVertical: spacing.xs, borderRadius: borderRadius.full },
  statusBadgeText: { fontSize: fontSize.sm, fontWeight: '700', color: colors.success },
  timeline: { backgroundColor: colors.white, borderRadius: borderRadius.xl, padding: spacing.xl, ...shadow.sm },
  timelineTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, marginBottom: spacing.lg },
  timelineItem: { flexDirection: 'row', marginBottom: spacing.lg },
  timelineDot: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.borderLight, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  timelineDotDone: { backgroundColor: colors.success },
  timelineStep: { fontSize: fontSize.sm, fontWeight: '700', color: colors.white },
  timelineContent: { flex: 1 },
  timelineTitleStep: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  timelineDesc: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  bottomBar: { padding: spacing.lg, backgroundColor: colors.white, ...shadow.lg },
});
