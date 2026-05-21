export type UserRole = 'user' | 'pandit' | 'temple_admin' | 'admin' | 'superadmin';
export type Language = 'en' | 'hi' | 'bn';
export type PackageType = 'basic' | 'standard' | 'premium';
export type PujaType = 'home' | 'temple';
export type RitualCategory = 'puja' | 'hawan' | 'aarti' | 'sanskar' | 'tarpan' | 'daily' | 'festival';
export type TempleCategory = 'local' | 'pilgrimage' | 'famous' | 'historic';
export type PaymentGateway = 'razorpay' | 'stripe';
export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet';
export type NotificationType =
  | 'booking_confirmation'
  | 'payment_success'
  | 'payment_failed'
  | 'puja_started'
  | 'puja_completed'
  | 'prasad_dispatched'
  | 'prasad_delivered'
  | 'festival_reminder'
  | 'offer_available'
  | 'review_request'
  | 'yatra_reminder'
  | 'general'
  | 'chat_message';
export type DonationType = 'general' | 'temple' | 'annadanam' | 'education' | 'medical' | 'infrastructure' | 'festival';
export type YatraCategory = 'domestic' | 'international';
export type MediaFileType = 'image' | 'video';
export type Priority = 'low' | 'normal' | 'high';

export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface Address {
  street: string;
  area?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Pricing {
  basic: number;
  standard: number;
  premium: number;
}

export interface Duration {
  basic: number;
  standard: number;
  premium: number;
}

export interface User {
  id: string;
  phone: string;
  email?: string;
  name: string;
  photo?: string;
  role: UserRole;
  language: Language;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  fcmTokens: string[];
  familyMembers: FamilyMember[];
  addresses: AddressEntry[];
  preferences: UserPreferences;
  isActive: boolean;
  lastLogin?: Date;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  gotra?: string;
  zodiac?: string;
  dob?: Date;
  isPrimary: boolean;
}

export interface AddressEntry {
  id: string;
  label: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface UserPreferences {
  notifications: boolean;
  emailUpdates: boolean;
  smsUpdates: boolean;
  language: Language;
}

export interface Deity {
  id: string;
  name: string;
  nameHi: string;
  nameBn: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  category: 'primary' | 'avatar' | 'form' | 'other';
  associatedMantra?: string;
  festivals: string[];
  order: number;
  isActive: boolean;
}

export interface Temple {
  id: string;
  name: string;
  nameHi: string;
  slug: string;
  description: string;
  shortDescription: string;
  mainImage: string;
  images: string[];
  deityId: string;
  deities: string[];
  address: Address;
  location: GeoPoint;
  contact: { phone: string; email: string; website: string };
  timings: TempleTimings;
  facilities: string[];
  category: TempleCategory;
  rating: number;
  reviewCount: number;
  totalBookings: number;
  isVerified: boolean;
  panditIds: string[];
  pricing: { minPujaPrice: number; maxPujaPrice: number };
  gallery: string[];
  isActive: boolean;
}

export interface TempleTimings {
  morning: { open: string; close: string };
  evening: { open: string; close: string };
  aartiTimings: Array<{ name: string; time: string }>;
}

export interface Ritual {
  id: string;
  name: string;
  nameHi: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: RitualCategory;
  type: PujaType | 'both';
  deityId: string;
  associatedDeities: string[];
  image: string;
  icon: string;
  pricing: Pricing;
  duration: Duration;
  includes: string[];
  requirements: string[];
  samagri: string[];
  benefits: string[];
  isPopular: boolean;
  isTrending: boolean;
  isActive: boolean;
  order: number;
}

export interface Booking {
  id: string;
  bookingId: string;
  userId: string;
  templeId?: string;
  panditId?: string;
  ritualId: string;
  deityId: string;
  packageType: PackageType;
  type: PujaType;
  address?: string;
  devotees: Devotee[];
  scheduledDate: Date;
  scheduledTime: string;
  amount: number;
  discount: number;
  couponCode?: string;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  specialRequests?: string;
  completionMedia: MediaFile[];
  completionNotes?: string;
  isReviewed: boolean;
  prasadDelivery?: PrasadDelivery;
  cancelledBy?: 'user' | 'pandit' | 'admin';
  cancellationReason?: string;
  cancelledAt?: Date;
  refundAmount?: number;
  liveStreamUrl?: string;
}

export type BookingStatus =
  | 'draft'
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Devotee {
  id: string;
  name: string;
  gotra?: string;
  relation: string;
  zodiac?: string;
}

export interface MediaFile {
  id: string;
  type: MediaFileType;
  url: string;
  uploadedAt: Date;
}

export interface PrasadDelivery {
  trackingId: string;
  courierPartner: string;
  status: 'processing' | 'dispatched' | 'in_transit' | 'delivered';
  estimatedDelivery: Date;
  trackingUrl: string;
}

export interface Payment {
  id: string;
  paymentId: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  gateway: PaymentGateway;
  gatewayPaymentId?: string;
  gatewayOrderId?: string;
  method?: PaymentMethod;
  status: PaymentStatus;
  refundId?: string;
  refundAmount?: number;
  refundedAt?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  image?: string;
  isRead: boolean;
  isPushSent: boolean;
  priority: Priority;
  createdAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  bookingId: string;
  templeId?: string;
  panditId?: string;
  rating: number;
  title?: string;
  description: string;
  images: string[];
  isVerifiedPurchase: boolean;
  isVisible: boolean;
  helpfulCount: number;
}

export interface Donation {
  id: string;
  donationId: string;
  userId?: string;
  templeId?: string;
  cause?: string;
  amount: number;
  currency: string;
  type: DonationType;
  isAnonymous: boolean;
  donorName?: string;
  message?: string;
  status: PaymentStatus;
}

export interface Yatra {
  id: string;
  name: string;
  nameHi: string;
  slug: string;
  description: string;
  shortDescription: string;
  mainImage: string;
  images: string[];
  duration: { days: number; nights: number };
  pricing: Pricing;
  includes: string[];
  excludes: string[];
  itinerary: YatraItinerary[];
  startDates: Date[];
  maxDevotees: number;
  currentBookings: number;
  transport: 'bus' | 'train' | 'flight' | 'all';
  accommodation: 'standard' | 'deluxe' | 'luxury';
  mealsIncluded: boolean;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  isFeatured: boolean;
  category: YatraCategory;
  state: string;
  region: string;
}

export interface YatraItinerary {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  perUserLimit: number;
  applicableFor: Array<'puja' | 'yatra' | 'donation'>;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface Chat {
  id: string;
  bookingId?: string;
  participants: Array<{ userId: string; role: UserRole }>;
  lastMessage?: string;
  lastMessageAt?: Date;
  unreadCount: Record<string, number>;
  isActive: boolean;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderType: UserRole;
  content: string;
  messageType: 'text' | 'image' | 'video' | 'document' | 'location';
  mediaUrl?: string;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: PaginatedResponse<unknown>;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalPandits: number;
  totalBookings: number;
  totalRevenue: number;
  pendingBookings: number;
  totalTemples: number;
  totalRituals: number;
}
