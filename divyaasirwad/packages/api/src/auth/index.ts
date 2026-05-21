import * as functions from 'firebase-functions';
import { db, auth, collections, FieldValue } from '../lib/firebase';
import { AppError, withErrorHandling, requireAuth, successResponse } from '../lib/errors';
import { logInfo, logEvent, measurePerformance } from '../lib/observability';
import { validateSchema, sendOtpSchema, verifyOtpSchema } from '../lib/validation';
import { generateOtp, generateId } from '@divyaasirwad/shared';

const OTP_STORE = new Map<string, { code: string; expires: number }>();

export const sendOtp = functions.https.onCall(async (data) => {
  return measurePerformance('auth.sendOtp', async () => {
    const { phone } = validateSchema(sendOtpSchema, data);
    const otp = generateOtp();
    OTP_STORE.set(phone, { code: otp, expires: Date.now() + 5 * 60 * 1000 });

    logInfo('OTP sent', { phone: phone.slice(0, 4) + '****' });
    logEvent('otp_sent', { phone });

    return successResponse({
      message: 'OTP sent successfully',
      otp: process.env.NODE_ENV === 'development' ? otp : undefined,
    });
  });
});

export const verifyOtp = functions.https.onCall(async (data, context) => {
  return measurePerformance('auth.verifyOtp', async () => {
    const { phone, otp, name } = validateSchema(verifyOtpSchema, data);
    const stored = OTP_STORE.get(phone);

    if (!stored || stored.code !== otp) {
      throw new AppError('Invalid OTP', 400, 'INVALID_OTP');
    }
    if (stored.expires < Date.now()) {
      OTP_STORE.delete(phone);
      throw new AppError('OTP expired', 400, 'OTP_EXPIRED');
    }

    OTP_STORE.delete(phone);

    let userRecord;
    try {
      userRecord = await auth.getUserByPhoneNumber(`+91${phone}`);
    } catch {
      userRecord = await auth.createUser({
        phoneNumber: `+91${phone}`,
        displayName: name || `User${phone.slice(-4)}`,
      });
    }

    const userRef = collections.users.doc(userRecord.uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      await userRef.set({
        id: userRecord.uid,
        phone,
        name: name || `User${phone.slice(-4)}`,
        role: 'user',
        language: 'en',
        isPhoneVerified: true,
        isEmailVerified: false,
        fcmTokens: [],
        familyMembers: [],
        addresses: [],
        preferences: { notifications: true, emailUpdates: true, smsUpdates: true, language: 'en' },
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      await userRef.update({ isPhoneVerified: true, lastLogin: new Date(), updatedAt: new Date() });
    }

    logEvent('login_success', { phone, isNewUser: !userSnap.exists });

    const customToken = await auth.createCustomToken(userRecord.uid);
    return successResponse({
      customToken,
      uid: userRecord.uid,
      isNewUser: !userSnap.exists,
    });
  });
});

export const getProfile = functions.https.onCall(async (_data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('auth.getProfile', async () => {
    const userDoc = await collections.users.doc(uid).get();
    if (!userDoc.exists) throw new AppError('User not found', 404, 'NOT_FOUND');
    return successResponse(userDoc.data());
  });
});

export const updateProfile = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('auth.updateProfile', async () => {
    const { name, email, language, photo, preferences } = data;
    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (language) updates.language = language;
    if (photo) updates.photo = photo;
    if (preferences) updates.preferences = preferences;

    await collections.users.doc(uid).update(updates);
    logEvent('profile_updated', { uid });
    return successResponse({ message: 'Profile updated' });
  });
});

export const addFamilyMember = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('auth.addFamilyMember', async () => {
    const { name, relation, gotra, zodiac, dob } = data;
    const member = {
      id: generateId('FM'),
      name,
      relation,
      gotra,
      zodiac,
      dob: dob ? new Date(dob) : undefined,
      isPrimary: false,
    };

    await collections.users.doc(uid).update({
      familyMembers: FieldValue.arrayUnion(member),
      updatedAt: new Date(),
    });

    logEvent('family_member_added', { uid });
    return successResponse(member);
  });
});

export const updateFcmToken = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  const { fcmToken } = data;
  await collections.users.doc(uid).update({
    fcmTokens: FieldValue.arrayUnion(fcmToken),
  });
  return successResponse({ message: 'FCM token updated' });
});

export const logout = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  const { fcmToken } = data;
  if (fcmToken) {
    await collections.users.doc(uid).update({
      fcmTokens: FieldValue.arrayRemove(fcmToken),
    });
  }
  return successResponse({ message: 'Logged out' });
});
