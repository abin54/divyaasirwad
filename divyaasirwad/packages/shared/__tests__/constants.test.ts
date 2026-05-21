import { describe, it, expect } from '@jest/globals';
import { DEITIES, FESTIVALS_2026, COMMISSION_RATE, SUPPORTED_LANGUAGES } from '../src/constants';

describe('Shared Constants', () => {
  it('should have 10 deities', () => {
    expect(DEITIES).toHaveLength(10);
  });

  it('should have valid deity structure', () => {
    DEITIES.forEach((deity) => {
      expect(deity).toHaveProperty('id');
      expect(deity).toHaveProperty('name');
      expect(deity).toHaveProperty('nameHi');
      expect(deity).toHaveProperty('nameBn');
      expect(deity).toHaveProperty('icon');
      expect(deity).toHaveProperty('color');
    });
  });

  it('should have festivals for 2026', () => {
    expect(FESTIVALS_2026.length).toBeGreaterThan(0);
    FESTIVALS_2026.forEach((f) => {
      expect(f.date).toMatch(/2026-/);
      expect(f.deity).toBeTruthy();
    });
  });

  it('should have correct commission rate', () => {
    expect(COMMISSION_RATE).toBe(0.20);
  });

  it('should support 3 languages', () => {
    expect(SUPPORTED_LANGUAGES).toEqual(['en', 'hi', 'bn']);
  });
});
