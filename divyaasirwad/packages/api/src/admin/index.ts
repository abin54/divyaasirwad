import * as functions from 'firebase-functions';
import { db, collections } from '../lib/firebase';
import { AppError, requireAuth, successResponse, paginatedResponse } from '../lib/errors';
import { logEvent, measurePerformance } from '../lib/observability';

export const getDashboardStats = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('admin.dashboard', async () => {
    const userDoc = await collections.users.doc(uid).get();
    if (!['admin', 'superadmin'].includes(userDoc.data()?.role)) {
      throw new AppError('Insufficient permissions', 403, 'PERMISSION_DENIED');
    }

    const [usersSnap, panditsSnap, bookingsSnap, templesSnap, ritualsSnap] = await Promise.all([
      collections.users.count().get(),
      collections.users.where('role', '==', 'pandit').count().get(),
      collections.bookings.count().get(),
      collections.temples.where('isActive', '==', true).count().get(),
      collections.rituals.where('isActive', '==', true).count().get(),
    ]);

    const paymentsSnap = await collections.payments.where('status', '==', 'paid').get();
    const totalRevenue = paymentsSnap.docs.reduce((sum, d) => sum + (d.data().amount || 0), 0);
    const activeUsers = await collections.users.where('lastLogin', '>=', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).count().get();
    const pendingBookings = await collections.bookings.where('status', '==', 'pending').count().get();

    return successResponse({
      totalUsers: usersSnap.data().count,
      activeUsers: activeUsers.data().count,
      totalPandits: panditsSnap.data().count,
      totalBookings: bookingsSnap.data().count,
      totalRevenue,
      pendingBookings: pendingBookings.data().count,
      totalTemples: templesSnap.data().count,
      totalRituals: ritualsSnap.data().count,
    });
  });
});

export const getAllBookings = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('admin.bookings', async () => {
    const userDoc = await collections.users.doc(uid).get();
    if (!['admin', 'superadmin'].includes(userDoc.data()?.role)) {
      throw new AppError('Insufficient permissions', 403, 'PERMISSION_DENIED');
    }

    const { page = 1, limit = 20, status, fromDate, toDate } = data;
    let query = collections.bookings.orderBy('createdAt', 'desc');
    if (status) query = query.where('status', '==', status);
    if (fromDate) query = query.where('createdAt', '>=', new Date(fromDate));
    if (toDate) query = query.where('createdAt', '<=', new Date(toDate));

    const skip = (page - 1) * limit;
    const snapshot = await query.offset(skip).limit(limit).get();
    const totalSnap = await query.count().get();
    return paginatedResponse(snapshot.docs.map((d) => d.data()), totalSnap.data().count, page, limit);
  });
});

export const getUsersList = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('admin.users', async () => {
    const userDoc = await collections.users.doc(uid).get();
    if (!['admin', 'superadmin'].includes(userDoc.data()?.role)) {
      throw new AppError('Insufficient permissions', 403, 'PERMISSION_DENIED');
    }

    const { page = 1, limit = 20, role, search } = data;
    let query = collections.users;
    if (role) query = query.where('role', '==', role);

    const skip = (page - 1) * limit;
    const snapshot = await query.orderBy('createdAt', 'desc').offset(skip).limit(limit).get();
    const totalSnap = await query.count().get();
    return paginatedResponse(snapshot.docs.map((d) => d.data()), totalSnap.data().count, page, limit);
  });
});

export const updateUserRole = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('admin.updateUserRole', async () => {
    const adminDoc = await collections.users.doc(uid).get();
    if (!['admin', 'superadmin'].includes(adminDoc.data()?.role)) {
      throw new AppError('Insufficient permissions', 403, 'PERMISSION_DENIED');
    }

    const { userId, role } = data;
    if (!['user', 'pandit', 'temple_admin', 'admin'].includes(role)) {
      throw new AppError('Invalid role', 400, 'INVALID_ARGUMENT');
    }

    await collections.users.doc(userId).update({ role, updatedAt: new Date() });
    logEvent('user_role_updated', { userId, role, adminId: uid });
    return successResponse({ message: 'User role updated' });
  });
});

export const toggleUserStatus = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('admin.toggleUser', async () => {
    const adminDoc = await collections.users.doc(uid).get();
    if (!['admin', 'superadmin'].includes(adminDoc.data()?.role)) {
      throw new AppError('Insufficient permissions', 403, 'PERMISSION_DENIED');
    }

    const { userId } = data;
    const userDoc = await collections.users.doc(userId).get();
    if (!userDoc.exists) throw new AppError('User not found', 404, 'NOT_FOUND');

    await collections.users.doc(userId).update({ isActive: !userDoc.data()?.isActive, updatedAt: new Date() });
    return successResponse({ message: 'User status toggled' });
  });
});
