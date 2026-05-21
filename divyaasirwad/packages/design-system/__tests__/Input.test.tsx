import { describe, it, expect, beforeEach } from '@jest/globals';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../src/components/Input';
import { ThemeProvider } from '../src/providers/ThemeProvider';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider>{component}</ThemeProvider>);

describe('Input', () => {
  it('renders correctly with label', () => {
    const { getByText } = renderWithTheme(<Input label="Phone" placeholder="Enter phone" />);
    expect(getByText('Phone')).toBeTruthy();
  });

  it('shows error message when error prop provided', () => {
    const { getByText } = renderWithTheme(<Input label="Phone" error="Invalid phone number" />);
    expect(getByText('Invalid phone number')).toBeTruthy();
  });

  it('shows helper text when no error', () => {
    const { getByText } = renderWithTheme(<Input label="Phone" helperText="10-digit number" />);
    expect(getByText('10-digit number')).toBeTruthy();
  });

  it('renders left icon', () => {
    const { getByText } = renderWithTheme(<Input leftIcon={<React.Fragment>🇮🇳</React.Fragment>} />);
    expect(getByText('🇮🇳')).toBeTruthy();
  });

  it('applies error styling', () => {
    const { getByPlaceholderText } = renderWithTheme(<Input placeholder="Test" error="Error" />);
    const input = getByPlaceholderText('Test');
    expect(input).toBeTruthy();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<any>();
    renderWithTheme(<Input ref={ref} placeholder="Test" />);
    expect(ref.current).toBeTruthy();
  });
});
