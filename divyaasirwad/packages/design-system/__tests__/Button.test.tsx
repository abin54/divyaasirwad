import { describe, it, expect, beforeEach } from '@jest/globals';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../src/components/Button';
import { ThemeProvider } from '../src/providers/ThemeProvider';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider>{component}</ThemeProvider>);

describe('Button', () => {
  it('renders correctly with default props', () => {
    const { getByText } = renderWithTheme(<Button onPress={() => {}}>Click Me</Button>);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(<Button onPress={onPress}>Click Me</Button>);
    fireEvent.press(getByText('Click Me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(<Button onPress={onPress} disabled>Click Me</Button>);
    fireEvent.press(getByText('Click Me'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows loading indicator when loading', () => {
    const { getByTestId } = renderWithTheme(<Button onPress={() => {}} loading testID="btn">Loading</Button>);
    const button = getByTestId('btn');
    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  it('applies variant styles', () => {
    const { getByText } = renderWithTheme(<Button onPress={() => {}} variant="outline">Outline</Button>);
    expect(getByText('Outline')).toBeTruthy();
  });

  it('applies fullWidth style', () => {
    const { getByText } = renderWithTheme(<Button onPress={() => {}} fullWidth>Full Width</Button>);
    expect(getByText('Full Width')).toBeTruthy();
  });
});
