export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const;

export const PAYMENT_STATUS = {
  CREATED: 'created',
  ATTEMPTED: 'attempted',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

export const USER_ROLES = {
  USER: 'user',
  PANDIT: 'pandit',
  TEMPLE_ADMIN: 'temple_admin',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
} as const;

export const RITUAL_CATEGORIES = {
  PUJA: 'puja',
  HAWAN: 'hawan',
  AARTI: 'aarti',
  SANSKAR: 'sanskar',
  TARPAN: 'tarpan',
  DAILY: 'daily',
  FESTIVAL: 'festival',
} as const;

export const PACKAGE_TYPES = {
  BASIC: 'basic',
  STANDARD: 'standard',
  PREMIUM: 'premium',
} as const;

export const PUJA_TYPES = {
  HOME: 'home',
  TEMPLE: 'temple',
  BOTH: 'both',
} as const;

export const NOTIFICATION_TYPES = {
  BOOKING_CONFIRMATION: 'booking_confirmation',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',
  PUJA_STARTED: 'puja_started',
  PUJA_COMPLETED: 'puja_completed',
  PRASAD_DISPATCHED: 'prasad_dispatched',
  PRASAD_DELIVERED: 'prasad_delivered',
  FESTIVAL_REMINDER: 'festival_reminder',
  OFFER_AVAILABLE: 'offer_available',
  REVIEW_REQUEST: 'review_request',
  YATRA_REMINDER: 'yatra_reminder',
  GENERAL: 'general',
  CHAT_MESSAGE: 'chat_message',
} as const;

export const DONATION_TYPES = {
  GENERAL: 'general',
  TEMPLE: 'temple',
  ANNADANAM: 'annadanam',
  EDUCATION: 'education',
  MEDICAL: 'medical',
  INFRASTRUCTURE: 'infrastructure',
  FESTIVAL: 'festival',
} as const;

export const TEMPLE_CATEGORIES = {
  LOCAL: 'local',
  PILGRIMAGE: 'pilgrimage',
  FAMOUS: 'famous',
  HISTORIC: 'historic',
} as const;

export const YATRA_CATEGORIES = {
  DOMESTIC: 'domestic',
  INTERNATIONAL: 'international',
} as const;

export const COMMISSION_RATE = 0.20; // 20% platform commission
export const CANCELLATION_WINDOW_HOURS = 24;
export const FULL_REFUND_WINDOW_HOURS = 24;
export const PARTIAL_REFUND_PERCENT = 0.5;
