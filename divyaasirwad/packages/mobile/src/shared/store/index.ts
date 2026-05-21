import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  photo?: string;
  role: string;
  language: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isOnboarded: boolean;
  isLoading: boolean;
  setOnboarded: () => void;
  setAuth: (token: string, user: User) => void;
  setUser: (updates: Partial<User>) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isOnboarded: false,
      isLoading: false,
      setOnboarded: () => set({ isOnboarded: true }),
      setAuth: (token, user) => set({ token, user, isOnboarded: true }),
      setUser: (updates) => set((state) => ({ user: state.user ? { ...state.user, ...updates } : null })),
      logout: () => set({ token: null, user: null }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    { name: 'auth-storage', storage: createJSONStorage(() => AsyncStorage) }
  )
);

interface BookingState {
  currentStep: number;
  data: Record<string, unknown>;
  setStep: (step: number) => void;
  setData: (data: Record<string, unknown>) => void;
  updateData: (data: Record<string, unknown>) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  currentStep: 0,
  data: {},
  setStep: (currentStep) => set({ currentStep }),
  setData: (data) => set({ data }),
  updateData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
  reset: () => set({ currentStep: 0, data: {} }),
}));

interface AppState {
  language: string;
  setLanguage: (language: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: 'en',
  setLanguage: (language) => set({ language }),
}));
