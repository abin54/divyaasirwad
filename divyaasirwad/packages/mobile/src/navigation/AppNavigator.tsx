import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { useAuthStore } from '../shared/store';
import { OnboardingScreen } from '../features/auth/OnboardingScreen';
import { LoginScreen } from '../features/auth/LoginScreen';
import { OtpScreen } from '../features/auth/OtpScreen';
import { HomeScreen } from '../features/home/HomeScreen';
import { TempleListScreen } from '../features/temples/TempleListScreen';
import { TempleDetailScreen } from '../features/temples/TempleDetailScreen';
import { RitualListScreen } from '../features/rituals/RitualListScreen';
import { RitualDetailScreen } from '../features/rituals/RitualDetailScreen';
import { SelectDeityScreen } from '../features/bookings/SelectDeityScreen';
import { SelectTempleScreen } from '../features/bookings/SelectTempleScreen';
import { SelectRitualScreen } from '../features/bookings/SelectRitualScreen';
import { SelectDateTimeScreen } from '../features/bookings/SelectDateTimeScreen';
import { DevoteeDetailsScreen } from '../features/bookings/DevoteeDetailsScreen';
import { BookingSummaryScreen } from '../features/bookings/BookingSummaryScreen';
import { PaymentScreen } from '../features/payments/PaymentScreen';
import { PaymentSuccessScreen } from '../features/payments/PaymentSuccessScreen';
import { BookingConfirmationScreen } from '../features/bookings/BookingConfirmationScreen';
import { ProfileScreen } from '../features/profile/ProfileScreen';
import { MyBookingsScreen } from '../features/profile/MyBookingsScreen';
import { BookingDetailScreen } from '../features/profile/BookingDetailScreen';
import { FamilyMembersScreen } from '../features/profile/FamilyMembersScreen';
import { YatraListScreen } from '../features/yatra/YatraListScreen';
import { YatraDetailScreen } from '../features/yatra/YatraDetailScreen';
import { HoroscopeScreen } from '../features/horoscope/HoroscopeScreen';
import { DonationsScreen } from '../features/donations/DonationsScreen';
import { NotificationsScreen } from '../features/notifications/NotificationsScreen';
import { PanditDashboardScreen } from '../features/pandit/PanditDashboardScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  const icons: Record<string, string> = { Home: '🏠', Temples: '🛕', Pujas: '📿', Bookings: '📋', Profile: '👤' };
  return (
    <View style={styles.tabIcon}>
      <Text style={[styles.tabEmoji, focused && styles.tabEmojiActive]}>{icons[name] || '●'}</Text>
    </View>
  );
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
      tabBarActiveTintColor: '#FF6F00',
      tabBarInactiveTintColor: '#9CA3AF',
      tabBarStyle: { backgroundColor: '#FFFFFF', borderTopColor: '#F3F4F6', height: 65, paddingBottom: 8, paddingTop: 4 },
      tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Temples" component={TempleListScreen} />
    <Tab.Screen name="Pujas" component={RitualListScreen} />
    <Tab.Screen name="Bookings" component={MyBookingsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export function AppNavigator() {
  const { token, isOnboarded } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isOnboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : !token ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Otp" component={OtpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="TempleDetail" component={TempleDetailScreen} />
            <Stack.Screen name="RitualDetail" component={RitualDetailScreen} />
            <Stack.Screen name="SelectDeity" component={SelectDeityScreen} />
            <Stack.Screen name="SelectTemple" component={SelectTempleScreen} />
            <Stack.Screen name="SelectRitual" component={SelectRitualScreen} />
            <Stack.Screen name="SelectDateTime" component={SelectDateTimeScreen} />
            <Stack.Screen name="DevoteeDetails" component={DevoteeDetailsScreen} />
            <Stack.Screen name="BookingSummary" component={BookingSummaryScreen} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
            <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
            <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
            <Stack.Screen name="FamilyMembers" component={FamilyMembersScreen} />
            <Stack.Screen name="YatraList" component={YatraListScreen} />
            <Stack.Screen name="YatraDetail" component={YatraDetailScreen} />
            <Stack.Screen name="Horoscope" component={HoroscopeScreen} />
            <Stack.Screen name="Donations" component={DonationsScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="PanditDashboard" component={PanditDashboardScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabIcon: { alignItems: 'center', justifyContent: 'center' },
  tabEmoji: { fontSize: 22 },
  tabEmojiActive: { fontSize: 24 },
});
