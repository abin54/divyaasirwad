import { useCallback } from 'react';
import { useAuthStore } from '../store';
import { authApi } from '../services/api';

export const useAuth = () => {
  const { token, user, setAuth, setUser, logout, setLoading } = useAuthStore();

  const sendOtp = useCallback(async (phone: string) => {
    setLoading(true);
    try {
      const res = await authApi.sendOtp(phone);
      return res.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  const verifyOtp = useCallback(async (phone: string, otp: string, name?: string) => {
    setLoading(true);
    try {
      const res = await authApi.verifyOtp(phone, otp, name);
      const { token, refreshToken, user } = res.data.data;
      setAuth(token, refreshToken, user);
      return res.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setAuth, setLoading]);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await authApi.getProfile();
      setUser(res.data.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }, [setUser]);

  const handleLogout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (error) {
      // ignore
    } finally {
      logout();
    }
  }, [logout]);

  return {
    token,
    user,
    isAuthenticated: !!token,
    sendOtp,
    verifyOtp,
    fetchProfile,
    logout: handleLogout,
  };
};
