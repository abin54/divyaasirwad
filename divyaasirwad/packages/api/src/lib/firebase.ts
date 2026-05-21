import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

if (!admin.apps.length) {
  admin.initializeApp();
}

export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();
export const messaging = admin.messaging();

export const logger = functions.logger;

export const collections = {
  users: db.collection('users'),
  temples: db.collection('temples'),
  rituals: db.collection('rituals'),
  deities: db.collection('deities'),
  bookings: db.collection('bookings'),
  payments: db.collection('payments'),
  yatras: db.collection('yatras'),
  donations: db.collection('donations'),
  reviews: db.collection('reviews'),
  notifications: db.collection('notifications'),
  coupons: db.collection('coupons'),
  chats: db.collection('chats'),
  chatMessages: db.collection('chatMessages'),
} as const;

export type CollectionName = keyof typeof collections;
