import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from '../constants/api';
import { useAuthStore } from '../store';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  sendOtp: (phone: string) => api.post('/auth/send-otp', { phone }),
  verifyOtp: (phone: string, otp: string, name?: string) => api.post('/auth/verify-otp', { phone, otp, name }),
  googleLogin: (data: { email: string; name: string; googleId: string; photo?: string }) => api.post('/auth/google', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
  addFamilyMember: (data: any) => api.post('/auth/family', data),
  logout: () => api.post('/auth/logout'),
};

export const templeApi = {
  getList: (params?: any) => api.get('/temples', { params }),
  getFeatured: () => api.get('/temples/featured'),
  getCities: () => api.get('/temples/cities'),
  search: (q: string) => api.get('/temples/search', { params: { q } }),
  getBySlug: (slug: string) => api.get(`/temples/${slug}`),
  getById: (id: string) => api.get(`/temples/id/${id}`),
};

export const pujaApi = {
  getRituals: (params?: any) => api.get('/pujas/rituals', { params }),
  getTrending: () => api.get('/pujas/rituals/trending'),
  getRitualBySlug: (slug: string) => api.get(`/pujas/rituals/${slug}`),
  getDeities: () => api.get('/pujas/deities'),
  getDeityBySlug: (slug: string) => api.get(`/pujas/deities/${slug}`),
  getRecommendations: (purpose: string) => api.get('/pujas/recommendations', { params: { purpose } }),
};

export const bookingApi = {
  create: (data: any) => api.post('/bookings', data),
  getList: (params?: any) => api.get('/bookings', { params }),
  getById: (id: string) => api.get(`/bookings/${id}`),
  getByBookingId: (bookingId: string) => api.get(`/bookings/tracking/${bookingId}`),
  cancel: (id: string, reason?: string) => api.put(`/bookings/${id}/cancel`, { reason }),
  uploadMedia: (id: string, formData: FormData) => api.post(`/bookings/${id}/media`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

export const paymentApi = {
  createOrder: (bookingId: string) => api.post('/payments/create-order', { bookingId }),
  verify: (data: any) => api.post('/payments/verify', data),
  getTransactions: () => api.get('/payments/transactions'),
};

export const yatraApi = {
  getList: (params?: any) => api.get('/yatras', { params }),
  getFeatured: () => api.get('/yatras/featured'),
  getBySlug: (slug: string) => api.get(`/yatras/${slug}`),
};

export default api;
