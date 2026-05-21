export const COMMISSION_RATE = 0.20;
export const MAX_BOOKINGS_PER_DAY = 10;
export const OTP_EXPIRY_SECONDS = 300;
export const JWT_EXPIRY = '7d';
export const JWT_REFRESH_EXPIRY = '30d';
export const SUPPORTED_LANGUAGES = ['en', 'hi', 'bn'] as const;
export const DEFAULT_LANGUAGE = 'en';
export const CURRENCY = 'INR';
export const CURRENCY_SYMBOL = '₹';
export const MAX_FILE_SIZE_MB = 50;
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime'];
export const PAGINATION_DEFAULT_LIMIT = 20;
export const PAGINATION_MAX_LIMIT = 100;
export const SEARCH_RADIUS_KM = 50;
export const REVIEW_MIN_LENGTH = 10;
export const REVIEW_MAX_LENGTH = 1000;
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
export const RATE_LIMIT_MAX_REQUESTS = 100;

export const DEITIES = [
  { id: 'shiva', name: 'Shiva', nameHi: 'शिव', nameBn: 'শিব', icon: '🕉️', color: '#E8F5E9' },
  { id: 'krishna', name: 'Krishna', nameHi: 'कृष्ण', nameBn: 'কৃষ্ণ', icon: '🪈', color: '#E3F2FD' },
  { id: 'durga', name: 'Durga', nameHi: 'दुर्गा', nameBn: 'দুর্গা', icon: '🦁', color: '#FCE4EC' },
  { id: 'hanuman', name: 'Hanuman', nameHi: 'हनुमान', nameBn: 'হনুমান', icon: '🙏', color: '#FFF3E0' },
  { id: 'lakshmi', name: 'Lakshmi', nameHi: 'लक्ष्मी', nameBn: 'লক্ষ্মী', icon: '🌺', color: '#F3E5F5' },
  { id: 'kali', name: 'Kali', nameHi: 'काली', nameBn: 'কালী', icon: '🔱', color: '#EDE7F6' },
  { id: 'ram', name: 'Ram', nameHi: 'राम', nameBn: 'রাম', icon: '🏹', color: '#E8EAF6' },
  { id: 'ganesh', name: 'Ganesh', nameHi: 'गणेश', nameBn: 'গণেশ', icon: '🐘', color: '#FFF8E1' },
  { id: 'saraswati', name: 'Saraswati', nameHi: 'सरस्वती', nameBn: 'সরস্বতী', icon: '📚', color: '#E0F7FA' },
  { id: 'vishnu', name: 'Vishnu', nameHi: 'विष्णु', nameBn: 'বিষ্ণু', icon: '🌀', color: '#E0F2F1' },
] as const;

export const FESTIVALS_2026 = [
  { name: 'Maha Shivratri', date: '2026-02-26', deity: 'shiva' },
  { name: 'Holi', date: '2026-03-10', deity: 'krishna' },
  { name: 'Navratri', date: '2026-10-12', deity: 'durga' },
  { name: 'Diwali', date: '2026-11-08', deity: 'lakshmi' },
  { name: 'Janmashtami', date: '2026-08-14', deity: 'krishna' },
  { name: 'Ganesh Chaturthi', date: '2026-09-05', deity: 'ganesh' },
  { name: 'Raksha Bandhan', date: '2026-08-29', deity: 'vishnu' },
  { name: 'Dussehra', date: '2026-10-21', deity: 'durga' },
] as const;
