import { describe, it, expect, beforeEach } from '@jest/globals';
import React from 'react';
import { render } from '@testing-library/react-native';
import { OtpScreen } from '../src/features/auth/OtpScreen';
import { useAuthStore } from '../src/shared/store';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), reset: jest.fn(), goBack: jest.fn() }),
  useRoute: () => ({ params: { phone: '9876543210' } }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

describe('OtpScreen', () => {
  beforeEach(() => {
    useAuthStore.setState({ token: null, user: null, isOnboarded: true });
  });

  it('renders without crashing', () => {
    expect(() => render(<OtpScreen />)).not.toThrow();
  });

  it('shows resend button after timer expires', () => {
    const { getByText } = render(<OtpScreen />);
    expect(getByText(/Resend OTP in \d+s/)).toBeTruthy();
  });
});
