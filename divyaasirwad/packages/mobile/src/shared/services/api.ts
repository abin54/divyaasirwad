import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from '../store';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://us-central1-divyaasirwad.cloudfunctions.net';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) useAuthStore.getState().logout();
    return Promise.reject(err);
  }
);

export const authApi = {
  sendOtp: (phone: string) => api.post('/sendOtp', { phone }),
  verifyOtp: (phone: string, otp: string, name?: string) => api.post('/verifyOtp', { phone, otp, name }),
  getProfile: () => api.post('/getProfile'),
  updateProfile: (data: any) => api.post('/updateProfile', data),
  addFamilyMember: (data: any) => api.post('/addFamilyMember', data),
  updateFcmToken: (fcmToken: string) => api.post('/updateFcmToken', { fcmToken }),
  logout: () => api.post('/logout'),
};

export const templeApi = {
  getList: (params?: any) => api.post('/getTemples', params),
  getFeatured: () => api.post('/getFeaturedTemples'),
  getCities: () => api.post('/getCities'),
  search: (q: string) => api.post('/searchTemples', { q }),
  getBySlug: (slug: string) => api.post('/getTempleBySlug', { slug }),
  getNearby: (lat: number, lng: number, radius?: number) => api.post('/getNearbyTemples', { lat, lng, radius }),
};

export const ritualApi = {
  getRituals: (params?: any) => api.post('/getRituals', params),
  getTrending: () => api.post('/getTrendingRituals'),
  getRitualBySlug: (slug: string) => api.post('/getRitualBySlug', { slug }),
  getDeities: () => api.post('/getDeities'),
  getRecommendations: (purpose?: string, occasion?: string, budget?: number) =>
    api.post('/getRecommendations', { purpose, occasion, budget }),
};

export const bookingApi = {
  create: (data: any) => api.post('/createBooking', data),
  getList: (params?: any) => api.post('/getUserBookings', params),
  getById: (id: string) => api.post('/getBookingById', { id }),
  getByBookingId: (bookingId: string) => api.post('/getBookingByBookingId', { bookingId }),
  cancel: (id: string, reason: string) => api.post('/cancelBooking', { id, reason }),
  updateStatus: (id: string, status: string, media?: any, notes?: string) =>
    api.post('/updateBookingStatus', { id, status, media, notes }),
  uploadMedia: (id: string, media: any) => api.post('/uploadCompletionMedia', { id, media }),
  getPanditBookings: (params?: any) => api.post('/getPanditBookings', params),
};

export const paymentApi = {
  createOrder: (bookingId: string) => api.post('/createPaymentOrder', { bookingId }),
  verify: (paymentId: string, razorpay_payment_id: string, razorpay_order_id: string, razorpay_signature: string) =>
    api.post('/verifyPayment', { paymentId, razorpay_payment_id, razorpay_order_id, razorpay_signature }),
  getTransactions: (params?: any) => api.post('/getTransactions', params),
};

export const notificationApi = {
  getList: (params?: any) => api.post('/getUserNotifications', params),
  markAsRead: (id: string) => api.post('/markAsRead', { id }),
  markAllAsRead: () => api.post('/markAllAsRead'),
  getUnreadCount: () => api.post('/getUnreadCount'),
};

export const adminApi = {
  getDashboard: () => api.post('/getDashboardStats'),
  getAllBookings: (params?: any) => api.post('/getAllBookings', params),
  getUsers: (params?: any) => api.post('/getUsersList', params),
  updateUserRole: (userId: string, role: string) => api.post('/updateUserRole', { userId, role }),
  toggleUserStatus: (userId: string) => api.post('/toggleUserStatus', { userId }),
};

export default api;
