import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize } from '../constants/theme';
import { RootStackParamList, MainTabParamList } from './types';
import { useAuthStore } from '../store';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import OtpScreen from '../screens/auth/OtpScreen';
import HomeScreen from '../screens/home/HomeScreen';
import TempleListScreen from '../screens/temples/TempleListScreen';
import TempleDetailScreen from '../screens/temples/TempleDetailScreen';
import RitualListScreen from '../screens/rituals/RitualListScreen';
import RitualDetailScreen from '../screens/rituals/RitualDetailScreen';
import SelectDeityScreen from '../screens/booking/SelectDeityScreen';
import SelectTempleScreen from '../screens/booking/SelectTempleScreen';
import SelectRitualScreen from '../screens/booking/SelectRitualScreen';
import SelectDateTimeScreen from '../screens/booking/SelectDateTimeScreen';
import DevoteeDetailsScreen from '../screens/booking/DevoteeDetailsScreen';
import BookingSummaryScreen from '../screens/booking/BookingSummaryScreen';
import PaymentScreen from '../screens/payments/PaymentScreen';
import PaymentSuccessScreen from '../screens/payments/PaymentSuccessScreen';
import BookingConfirmationScreen from '../screens/booking/BookingConfirmationScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import MyBookingsScreen from '../screens/profile/MyBookingsScreen';
import BookingDetailScreen from '../screens/profile/BookingDetailScreen';
import FamilyMembersScreen from '../screens/profile/FamilyMembersScreen';
import YatraListScreen from '../screens/yatra/YatraListScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

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
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.tabInactive,
      tabBarStyle: { backgroundColor: colors.white, borderTopColor: colors.borderLight, height: 65, paddingBottom: 8, paddingTop: 4 },
      tabBarLabelStyle: { fontSize: fontSize.xs, fontWeight: '600' },
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

export default function AppNavigator() {
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
            <Stack.Screen name="TempleList" component={TempleListScreen} />
            <Stack.Screen name="RitualDetail" component={RitualDetailScreen} />
            <Stack.Screen name="RitualList" component={RitualListScreen} />
            <Stack.Screen name="SelectDeity" component={SelectDeityScreen} />
            <Stack.Screen name="SelectTemple" component={SelectTempleScreen} />
            <Stack.Screen name="SelectRitual" component={SelectRitualScreen} />
            <Stack.Screen name="SelectDateTime" component={SelectDateTimeScreen} />
            <Stack.Screen name="DevoteeDetails" component={DevoteeDetailsScreen} />
            <Stack.Screen name="BookingSummary" component={BookingSummaryScreen} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
            <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
            <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
            <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
            <Stack.Screen name="FamilyMembers" component={FamilyMembersScreen} />
            <Stack.Screen name="YatraList" component={YatraListScreen} />
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
