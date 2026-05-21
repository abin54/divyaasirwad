import * as functions from 'firebase-functions';

export { sendOtp, verifyOtp, getProfile, updateProfile, addFamilyMember, updateFcmToken, logout } from './auth';
export { createBooking, getUserBookings, getBookingById, getBookingByBookingId, cancelBooking, updateBookingStatus, uploadCompletionMedia, getPanditBookings } from './bookings';
export { getTemples, getTempleBySlug, getFeaturedTemples, searchTemples, getCities, getNearbyTemples } from './temples';
export { getRituals, getRitualBySlug, getTrendingRituals, getDeities, getRecommendations } from './rituals';
export { createPaymentOrder, verifyPayment, getTransactions } from './payments';
export { getUserNotifications, markAsRead, markAllAsRead, getUnreadCount, onBookingStatusChange } from './notifications';
export { getDashboardStats, getAllBookings, getUsersList, updateUserRole, toggleUserStatus } from './admin';

export { healthCheck } from './lib/observability';
