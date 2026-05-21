import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  photo?: string;
  role: string;
  language: string;
  familyMembers: any[];
  addresses: any[];
}

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isOnboarded: boolean;
  isLoading: boolean;
  setOnboarded: () => void;
  setAuth: (token: string, refreshToken: string, user: User) => void;
  setUser: (user: Partial<User>) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  refreshToken: null,
  user: null,
  isOnboarded: false,
  isLoading: false,
  setOnboarded: () => set({ isOnboarded: true }),
  setAuth: (token, refreshToken, user) => set({ token, refreshToken, user, isOnboarded: true }),
  setUser: (updates) => set((state) => ({ user: state.user ? { ...state.user, ...updates } : null })),
  logout: () => set({ token: null, refreshToken: null, user: null }),
  setLoading: (isLoading) => set({ isLoading }),
}));

interface BookingState {
  currentBooking: any;
  bookingStep: number;
  setBookingStep: (step: number) => void;
  setBookingData: (data: any) => void;
  updateBookingData: (data: any) => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  currentBooking: null,
  bookingStep: 0,
  setBookingStep: (step) => set({ bookingStep: step }),
  setBookingData: (data) => set({ currentBooking: data }),
  updateBookingData: (data) => set((state) => ({ currentBooking: { ...state.currentBooking, ...data } })),
  clearBooking: () => set({ currentBooking: null, bookingStep: 0 }),
}));

interface AppState {
  language: string;
  setLanguage: (lang: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: 'en',
  setLanguage: (language) => set({ language }),
}));
