import admin from 'firebase-admin';
import { config } from '../config';
import { logger } from '../utils/logger';

let firebaseInitialized = false;

export const initializeFirebase = () => {
  if (firebaseInitialized) return;
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });
    firebaseInitialized = true;
    logger.info('Firebase Admin initialized');
  } catch (error) {
    logger.warn('Firebase initialization skipped (no credentials)');
  }
};

export const sendPushNotification = async (tokens: string[], title: string, body: string, data?: Record<string, unknown>) => {
  if (!firebaseInitialized || tokens.length === 0) return;
  try {
    const message = {
      notification: { title, body },
      data: data ? Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v)])) : undefined,
      tokens,
    };
    await admin.messaging().sendEachForMulticast(message);
  } catch (error) {
    logger.error('Push notification failed:', error);
  }
};

export const sendPushToTopic = async (topic: string, title: string, body: string, data?: Record<string, unknown>) => {
  if (!firebaseInitialized) return;
  try {
    await admin.messaging().send({
      topic,
      notification: { title, body },
      data: data ? Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v)])) : undefined,
    });
  } catch (error) {
    logger.error('Topic push failed:', error);
  }
};
