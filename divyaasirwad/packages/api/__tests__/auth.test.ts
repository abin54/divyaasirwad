import { describe, it, expect, beforeEach } from '@jest/globals';
import * as functions from 'firebase-functions-test';
import * as admin from 'firebase-admin';

const testEnv = functions({ projectId: 'test-project' }, './serviceAccountKey.json');

describe('Auth Functions', () => {
  let wrappedSendOtp: any;
  let wrappedVerifyOtp: any;

  beforeEach(() => {
    wrappedSendOtp = testEnv.wrap(require('../src/auth').sendOtp);
    wrappedVerifyOtp = testEnv.wrap(require('../src/auth').verifyOtp);
  });

  afterAll(() => testEnv.cleanup());

  describe('sendOtp', () => {
    it('should generate and store OTP', async () => {
      const result = await wrappedSendOtp({ phone: '9876543210' });
      expect(result.success).toBe(true);
      expect(result.message).toBe('OTP sent successfully');
    });

    it('should reject invalid phone number', async () => {
      await expect(wrappedSendOtp({ phone: '123' })).rejects.toThrow();
    });
  });

  describe('verifyOtp', () => {
    it('should verify correct OTP', async () => {
      await wrappedSendOtp({ phone: '9876543210' });
      const result = await wrappedVerifyOtp({ phone: '9876543210', otp: '123456' }, { auth: { uid: 'test-uid' } });
      expect(result.success).toBe(true);
    });
  });
});
