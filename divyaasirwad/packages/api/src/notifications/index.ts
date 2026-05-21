import * as functions from 'firebase-functions';
import { db, collections, messaging } from '../lib/firebase';
import { AppError, requireAuth, successResponse, paginatedResponse } from '../lib/errors';
import { logInfo, logEvent, measurePerformance } from '../lib/observability';
import { generateId } from '@divyaasirwad/shared';

export interface NotificationPayload {
  userId: string;
  type: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  image?: string;
  priority?: 'low' | 'normal' | 'high';
}

export async function createNotification(payload: NotificationPayload) {
  const notificationRef = collections.notifications.doc(generateId('N'));
  const notification = {
    id: notificationRef.id,
    userId: payload.userId,
    type: payload.type,
    title: payload.title,
    body: payload.body,
    data: payload.data || {},
    image: payload.image,
    isRead: false,
    isPushSent: false,
    priority: payload.priority || 'normal',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await notificationRef.set(notification);

  const userDoc = await collections.users.doc(payload.userId).get();
  const fcmTokens = userDoc.data()?.fcmTokens || [];
  if (fcmTokens.length > 0) {
    try {
      await messaging.sendEachForMulticast({
        tokens: fcmTokens,
        notification: { title: payload.title, body: payload.body },
        data: Object.fromEntries(Object.entries({ ...payload.data, type: payload.type, notificationId: notificationRef.id }).map(([k, v]) => [k, String(v)])),
      });
      await notificationRef.update({ isPushSent: true });
    } catch (error) {
      logInfo('Push notification failed', { userId: payload.userId });
    }
  }

  return notification;
}

export const getUserNotifications = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('notifications.list', async () => {
    const { page = 1, limit = 20, unread } = data;
    let query = collections.notifications.where('userId', '==', uid).orderBy('createdAt', 'desc');
    if (unread) query = query.where('isRead', '==', false);

    const skip = (page - 1) * limit;
    const snapshot = await query.offset(skip).limit(limit).get();
    const totalSnap = await query.count().get();
    return paginatedResponse(snapshot.docs.map((d) => d.data()), totalSnap.data().count, page, limit);
  });
});

export const markAsRead = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('notifications.markRead', async () => {
    const { id } = data;
    const doc = await collections.notifications.doc(id).get();
    if (!doc.exists) throw new AppError('Notification not found', 404, 'NOT_FOUND');
    if (doc.data()?.userId !== uid) throw new AppError('Unauthorized', 403, 'PERMISSION_DENIED');
    await doc.ref.update({ isRead: true, updatedAt: new Date() });
    return successResponse({ message: 'Notification marked as read' });
  });
});

export const markAllAsRead = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('notifications.markAllRead', async () => {
    const snapshot = await collections.notifications.where('userId', '==', uid).where('isRead', '==', false).get();
    const batch = db.batch();
    snapshot.docs.forEach((doc) => batch.update(doc.ref, { isRead: true, updatedAt: new Date() }));
    await batch.commit();
    return successResponse({ message: 'All notifications marked as read', count: snapshot.size });
  });
});

export const getUnreadCount = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  const snapshot = await collections.notifications.where('userId', '==', uid).where('isRead', '==', false).count().get();
  return successResponse({ count: snapshot.data().count });
});

export const onBookingStatusChange = functions.firestore.document('bookings/{bookingId}').onUpdate(async (change) => {
  const before = change.before.data();
  const after = change.after.data();
  if (before.status !== after.status) {
    const notifications: Array<{ type: string; title: string; body: string }> = [];

    if (after.status === 'confirmed') {
      notifications.push({ type: 'booking_confirmation', title: 'Booking Confirmed! 🕉️', body: `Your booking ${after.bookingId} has been confirmed.` });
    }
    if (after.status === 'in_progress') {
      notifications.push({ type: 'puja_started', title: 'Puja Started 🙏', body: `Your puja for booking ${after.bookingId} has started.` });
    }
    if (after.status === 'completed') {
      notifications.push({ type: 'puja_completed', title: 'Puja Completed! ✨', body: `Your puja has been completed. View photos now.` });
    }
    if (after.status === 'cancelled') {
      notifications.push({ type: 'general', title: 'Booking Cancelled', body: `Your booking ${after.bookingId} has been cancelled.` });
    }

    for (const n of notifications) {
      await createNotification({ userId: after.userId, type: n.type, title: n.title, body: n.body, data: { bookingId: after.bookingId }, priority: 'high' });
    }
  }
});
