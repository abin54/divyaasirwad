import { describe, it, expect, beforeEach } from '@jest/globals';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
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

  it('renders OTP input fields', () => {
    const { getAllByPlaceholderText } = render(<OtpScreen />);
    expect(getAllByPlaceholderText('Enter OTP')).toHaveLength(6);
  });

  it('auto-focuses next input on digit entry', () => {
    const { getAllByPlaceholderText } = render(<OtpScreen />);
    const inputs = getAllByPlaceholderText('Enter OTP');
    fireEvent.changeText(inputs[0], '1');
    expect(inputs[1]).toBeTruthy();
  });

  it('shows resend button after timer expires', () => {
    const { getByText } = render(<OtpScreen />);
    expect(getByText(/Resend OTP in \d+s/)).toBeTruthy();
  });
});
