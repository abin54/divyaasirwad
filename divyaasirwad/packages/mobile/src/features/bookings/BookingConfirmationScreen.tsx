import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text as DSText, Card } from '@divyaasirwad/design-system';

export function BookingConfirmationScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const { bookingId } = route.params;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.statusCard}>
          <Text style={styles.statusIcon}>🕉️</Text>
          <DSText variant="subheading" weight="extrabold">Booking Confirmed!</DSText>
          <DSText variant="caption" color="#6B7280" style={{ fontFamily: 'monospace' }}>{bookingId}</DSText>
          <View style={styles.statusBadge}><DSText variant="caption" weight="semibold" color="#059669">● Confirmed</DSText></View>
        </Card>

        <Card style={styles.timeline}>
          <DSText variant="label" weight="bold" style={styles.timelineTitle}>What happens next?</DSText>
          {[
            { step: '1', title: 'Confirmation', desc: 'Temple/Pandit confirms your booking', done: true },
            { step: '2', title: 'Preparation', desc: 'Ritual preparations begin', done: false },
            { step: '3', title: 'Puja in Progress', desc: 'Watch live or get updates', done: false },
            { step: '4', title: 'Completion', desc: 'Get photos/videos of the puja', done: false },
            { step: '5', title: 'Prasad Delivery', desc: 'Track your prasad delivery', done: false },
          ].map((item, i) => (
            <View key={i} style={styles.timelineItem}>
              <View style={[styles.timelineDot, item.done && styles.timelineDotDone]}>
                <DSText variant="caption" weight="bold" color="#FFFFFF">{item.step}</DSText>
              </View>
              <View style={styles.timelineContent}>
                <DSText variant="label" weight="semibold" color={item.done ? '#059669' : '#1A1A1A'}>{item.title}</DSText>
                <DSText variant="caption" color="#6B7280">{item.desc}</DSText>
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>
      <View style={styles.bottomBar}>
        <Button title="Go to My Bookings" onPress={() => navigation.navigate('Bookings')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  content: { padding: 16 },
  statusCard: { alignItems: 'center', padding: 32, marginBottom: 24 },
  statusIcon: { fontSize: 56, marginBottom: 12 },
  statusBadge: { marginTop: 12, backgroundColor: '#D1FAE5', paddingHorizontal: 16, paddingVertical: 4, borderRadius: 20 },
  timeline: { padding: 24 },
  timelineTitle: { marginBottom: 16 },
  timelineItem: { flexDirection: 'row', marginBottom: 16 },
  timelineDot: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  timelineDotDone: { backgroundColor: '#059669' },
  timelineContent: { flex: 1 },
  bottomBar: { padding: 16, backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
});
