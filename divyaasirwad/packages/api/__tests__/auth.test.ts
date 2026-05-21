import { describe, it, expect, afterAll, beforeAll } from '@jest/globals';

process.env.NODE_ENV = 'development';

const testPhone = '9876543210';

function createAdminMock() {
  const mockApps: object[] = [];
  return {
    apps: mockApps,
    credential: { applicationDefault: jest.fn() },
    initializeApp: jest.fn(() => { mockApps.push({}); }),
    auth: jest.fn(() => ({
      getUserByPhoneNumber: jest.fn().mockRejectedValue(new Error('not found')),
      createUser: jest.fn().mockResolvedValue({ uid: 'mock-uid-12345' }),
      createCustomToken: jest.fn().mockResolvedValue('mock-custom-token'),
    })),
    firestore: Object.assign(
      jest.fn(() => ({
        collection: jest.fn().mockReturnThis(),
        doc: jest.fn().mockReturnThis(),
        get: jest.fn().mockResolvedValue({ exists: false }),
        set: jest.fn().mockResolvedValue(undefined),
        update: jest.fn().mockResolvedValue(undefined),
      })),
      { FieldValue: { serverTimestamp: jest.fn(), arrayUnion: jest.fn(), arrayRemove: jest.fn() } }
    ),
    storage: jest.fn(() => ({ bucket: jest.fn().mockReturnThis() })),
    messaging: jest.fn(() => ({ send: jest.fn().mockResolvedValue('mock-msg-id') })),
  };
}

describe('Auth Functions', () => {
  let wrappedSendOtp: (data: unknown, context?: Record<string, unknown>) => unknown;
  let wrappedVerifyOtp: typeof wrappedSendOtp;
  let cleanup: () => void;

  beforeAll(() => {
    jest.resetModules();
    jest.doMock('firebase-admin', createAdminMock);
    const functionsTest = require('firebase-functions-test');
    const testEnv = functionsTest({ projectId: 'test-project' });
    cleanup = () => testEnv.cleanup();
    const wrap = (fn: unknown) =>
      testEnv.wrap(fn) as unknown as (data: unknown, context?: Record<string, unknown>) => unknown;
    wrappedSendOtp = wrap(require('../src/auth').sendOtp);
    wrappedVerifyOtp = wrap(require('../src/auth').verifyOtp);
  });

  afterAll(() => cleanup?.());

  describe('sendOtp', () => {
    it('should generate and store OTP', async () => {
      const result = await wrappedSendOtp({ phone: testPhone }) as Record<string, unknown>;
      expect(result.success).toBe(true);
      expect((result.data as Record<string, unknown>).message).toBe('OTP sent successfully');
      expect((result.data as Record<string, unknown>).otp).toBeDefined();
    });

    it('should reject invalid phone number', async () => {
      await expect(wrappedSendOtp({ phone: '123' })).rejects.toThrow();
    });
  });

  describe('verifyOtp', () => {
    it('should verify correct OTP', async () => {
      const sendResult = await wrappedSendOtp({ phone: testPhone }) as Record<string, unknown>;
      const otp = (sendResult.data as Record<string, unknown>).otp as string;
      const result = await wrappedVerifyOtp(
        { phone: testPhone, otp, name: 'Test User' },
        { auth: { uid: 'test-uid' }, rawRequest: {} }
      ) as Record<string, unknown>;
      expect(result.success).toBe(true);
      expect((result.data as Record<string, unknown>).customToken).toBeDefined();
      expect((result.data as Record<string, unknown>).uid).toBeDefined();
      expect((result.data as Record<string, unknown>).isNewUser).toBe(true);
    });

    it('should reject invalid OTP', async () => {
      await expect(wrappedVerifyOtp(
        { phone: testPhone, otp: '000000' },
        { auth: { uid: 'test-uid' }, rawRequest: {} }
      )).rejects.toThrow('Invalid OTP');
    });
  });
});
