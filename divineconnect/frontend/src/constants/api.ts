import Constants from 'expo-constants';

const { extra } = Constants;
export const API_URL = extra?.apiUrl || 'http://localhost:5000/api/v1';
export const RAZORPAY_KEY_ID = extra?.razorpayKeyId || '';

export const ENDPOINTS = {
  AUTH: { SEND_OTP: '/auth/send-otp', VERIFY_OTP: '/auth/verify-otp', GOOGLE: '/auth/google', REFRESH: '/auth/refresh-token', PROFILE: '/auth/profile', UPDATE_PROFILE: '/auth/profile', ADD_FAMILY: '/auth/family', FCM_TOKEN: '/auth/fcm-token', LOGOUT: '/auth/logout' },
  TEMPLES: { LIST: '/temples', FEATURED: '/temples/featured', CITIES: '/temples/cities', SEARCH: '/temples/search', BY_SLUG: (s: string) => `/temples/${s}`, BY_ID: (id: string) => `/temples/id/${id}` },
  PUJAS: { RITUALS: '/pujas/rituals', TRENDING: '/pujas/rituals/trending', RITUAL_BY_SLUG: (s: string) => `/pujas/rituals/${s}`, DEITIES: '/pujas/deities', DEITY_BY_SLUG: (s: string) => `/pujas/deities/${s}`, RECOMMENDATIONS: '/pujas/recommendations' },
  BOOKINGS: { CREATE: '/bookings', LIST: '/bookings', DETAIL: (id: string) => `/bookings/${id}`, CANCEL: (id: string) => `/bookings/${id}/cancel`, BY_BOOKING_ID: (id: string) => `/bookings/tracking/${id}`, PANDIT: '/bookings/pandit', UPDATE_STATUS: (id: string) => `/bookings/${id}/status`, UPLOAD_MEDIA: (id: string) => `/bookings/${id}/media` },
  PAYMENTS: { CREATE_ORDER: '/payments/create-order', VERIFY: '/payments/verify', TRANSACTIONS: '/payments/transactions', STATUS: (id: string) => `/payments/${id}`, REFUND: (id: string) => `/payments/${id}/refund` },
  YATRAS: { LIST: '/yatras', FEATURED: '/yatras/featured', BY_SLUG: (s: string) => `/yatras/${s}` },
  ADMIN: { DASHBOARD: '/admin/dashboard', ANALYTICS: '/admin/analytics', USERS: '/admin/users', USER_ROLE: (id: string) => `/admin/users/${id}/role`, USER_TOGGLE: (id: string) => `/admin/users/${id}/toggle-status` },
};
