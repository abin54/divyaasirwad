import Notification from '../models/Notification';
import User from '../models/User';
import { sendPushNotification } from './firebaseService';
import { sendSms } from './smsService';
import { sendEmail } from './emailService';

interface NotificationPayload {
  userId: string;
  type: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  image?: string;
  priority?: 'low' | 'normal' | 'high';
}

export const createNotification = async (payload: NotificationPayload) => {
  try {
    const notification = await Notification.create({
      user: payload.userId,
      type: payload.type,
      title: payload.title,
      body: payload.body,
      data: payload.data,
      image: payload.image,
      priority: payload.priority || 'normal',
    });

    const user = await User.findById(payload.userId);
    if (user?.fcmTokens?.length) {
      await sendPushNotification(user.fcmTokens, payload.title, payload.body, {
        ...payload.data,
        notificationId: notification._id.toString(),
        type: payload.type,
      });
    }

    if (user?.preferences?.smsUpdates && user.phone) {
      await sendSms(user.phone, `${payload.title}: ${payload.body}`);
    }

    if (user?.preferences?.emailUpdates && user.email) {
      await sendEmail(user.email, payload.title, payload.body);
    }

    return notification;
  } catch (error) {
    console.error('Notification creation failed:', error);
  }
};

export const notifyBookingConfirmation = async (userId: string, bookingId: string) => {
  await createNotification({
    userId,
    type: 'booking_confirmation',
    title: 'Booking Confirmed! 🕉️',
    body: `Your booking ${bookingId} has been confirmed. You will receive updates soon.`,
    data: { bookingId },
    priority: 'high',
  });
};

export const notifyPujaCompleted = async (userId: string, bookingId: string) => {
  await createNotification({
    userId,
    type: 'puja_completed',
    title: 'Puja Completed! 🙏',
    body: `Your puja for booking ${bookingId} has been completed. View photos and videos now.`,
    data: { bookingId },
    priority: 'high',
  });
};

export const notifyPrasadDispatched = async (userId: string, trackingId: string) => {
  await createNotification({
    userId,
    type: 'prasad_dispatched',
    title: 'Prasad Dispatched! 📦',
    body: `Your prasad has been dispatched. Track with ID: ${trackingId}`,
    data: { trackingId },
    priority: 'normal',
  });
};

export const notifyFestivalReminder = async (userId: string, festival: string) => {
  await createNotification({
    userId,
    type: 'festival_reminder',
    title: `Upcoming: ${festival} 🎉`,
    body: `${festival} is approaching! Book your puja now for blessings.`,
    priority: 'normal',
  });
};
