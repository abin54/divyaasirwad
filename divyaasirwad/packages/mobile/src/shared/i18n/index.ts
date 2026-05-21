import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const en = {
  common: { appName: 'Divyaasirwad', loading: 'Loading...', error: 'Something went wrong', retry: 'Retry', cancel: 'Cancel', confirm: 'Confirm', save: 'Save', search: 'Search', seeAll: 'See All', back: 'Back', next: 'Next', submit: 'Submit', done: 'Done', skip: 'Skip', continue: 'Continue' },
  auth: { loginTitle: 'Welcome to Divyaasirwad', loginSubtitle: 'Book pujas, connect with temples, experience divinity', phonePlaceholder: 'Enter phone number', otpPlaceholder: 'Enter OTP', sendOtp: 'Send OTP', verifyOtp: 'Verify OTP', loginWithGoogle: 'Continue with Google', or: 'OR', enterName: 'Enter your name', otpSent: 'OTP sent to {{phone}}', resendOtp: 'Resend OTP in {{seconds}}s', resend: 'Resend OTP' },
  home: { greeting: 'Namaste, {{name}}', searchPlaceholder: 'Search temples, pujas, pandits...', featuredTemples: 'Featured Temples', trendingPujas: 'Trending Pujas', festivalOffers: 'Festival Offers', recommended: 'Recommended For You', bookPuja: 'Book Puja', bookYatra: 'Book Yatra', liveDarshan: 'Live Darshan', dailyHoroscope: 'Daily Horoscope', donations: 'Donations' },
  temples: { title: 'Temples', nearby: 'Nearby Temples', popular: 'Popular Temples', filter: 'Filter', sort: 'Sort', city: 'City', state: 'State', deity: 'Deity', rating: 'Rating', reviews: 'Reviews', timings: 'Temple Timings', about: 'About Temple', bookPujaAt: 'Book Puja at {{name}}' },
  booking: { selectDeity: 'Select Deity', selectTemple: 'Select Temple', selectRitual: 'Select Ritual', selectPackage: 'Select Package', selectDate: 'Select Date', selectTime: 'Select Time', addDevotees: 'Add Devotee Details', review: 'Review & Confirm', payment: 'Payment', confirmation: 'Booking Confirmed!', basic: 'Basic', standard: 'Standard', premium: 'Premium', homePuja: 'Home Puja', templePuja: 'Temple Puja', gotra: 'Gotra', specialRequests: 'Special Requests', totalAmount: 'Total Amount', confirmBooking: 'Confirm Booking', bookingId: 'Booking ID', status: 'Status' },
  payment: { title: 'Payment', upi: 'UPI', card: 'Credit/Debit Card', netbanking: 'Net Banking', wallet: 'Wallet', pay: 'Pay ₹{{amount}}', success: 'Payment Successful!', failed: 'Payment Failed', tryAgain: 'Try Again' },
  profile: { title: 'Profile', myBookings: 'My Bookings', family: 'Family Members', payments: 'Payment History', notifications: 'Notifications', language: 'Language', settings: 'Settings', logout: 'Logout' },
};

const hi = {
  common: { appName: 'दिव्याशीर्वाद', loading: 'लोड हो रहा है...', error: 'कुछ गलत हो गया', retry: 'पुनः प्रयास करें', cancel: 'रद्द करें', confirm: 'पुष्टि करें', save: 'सहेजें', search: 'खोजें', seeAll: 'सभी देखें', back: 'वापस', next: 'अगला', submit: 'जमा करें' },
  auth: { loginTitle: 'दिव्याशीर्वाद में आपका स्वागत है', loginSubtitle: 'पूजा बुक करें, मंदिरों से जुड़ें', phonePlaceholder: 'फोन नंबर दर्ज करें', otpPlaceholder: 'OTP दर्ज करें', sendOtp: 'OTP भेजें', verifyOtp: 'OTP सत्यापित करें', loginWithGoogle: 'Google से जारी रखें' },
  home: { greeting: 'नमस्ते, {{name}}', searchPlaceholder: 'मंदिर, पूजा, पंडित खोजें...', featuredTemples: 'फीचर्ड मंदिर', trendingPujas: 'ट्रेंडिंग पूजा', bookPuja: 'पूजा बुक करें', bookYatra: 'यात्रा बुक करें', liveDarshan: 'लाइव दर्शन', dailyHoroscope: 'दैनिक राशिफल', donations: 'दान' },
  temples: { title: 'मंदिर', nearby: 'आस-पास के मंदिर', popular: 'लोकप्रिय मंदिर', city: 'शहर', state: 'राज्य', deity: 'देवता', rating: 'रेटिंग', reviews: 'समीक्षाएं', about: 'मंदिर के बारे में' },
  booking: { selectDeity: 'देवता चुनें', selectTemple: 'मंदिर चुनें', selectRitual: 'अनुष्ठान चुनें', selectPackage: 'पैकेज चुनें', selectDate: 'तारीख चुनें', selectTime: 'समय चुनें', addDevotees: 'श्रद्धालु विवरण', review: 'समीक्षा करें', payment: 'भुगतान', confirmation: 'बुकिंग कन्फर्म!', basic: 'बेसिक', standard: 'स्टैंडर्ड', premium: 'प्रीमियम', gotra: 'गोत्र', totalAmount: 'कुल राशि', confirmBooking: 'बुकिंग कन्फर्म करें', bookingId: 'बुकिंग ID', status: 'स्थिति' },
  payment: { title: 'भुगतान', upi: 'UPI', card: 'कार्ड', netbanking: 'नेट बैंकिंग', wallet: 'वॉलेट', pay: '₹{{amount}} का भुगतान करें', success: 'भुगतान सफल!', failed: 'भुगतान विफल' },
  profile: { title: 'प्रोफाइल', myBookings: 'मेरी बुकिंग', family: 'परिवार के सदस्य', language: 'भाषा', logout: 'लॉग आउट' },
};

const bn = {
  common: { appName: 'দিব্যাশীর্বাদ', loading: 'লোড হচ্ছে...', error: 'কিছু ভুল হয়েছে', retry: 'পুনরায় চেষ্টা করুন', cancel: 'বাতিল করুন', confirm: 'নিশ্চিত করুন', save: 'সংরক্ষণ করুন', search: 'অনুসন্ধান', seeAll: 'সব দেখুন', back: 'পেছনে', next: 'পরবর্তী', submit: 'জমা দিন' },
  auth: { loginTitle: 'দিব্যাশীর্বাদ-এ স্বাগতম', loginSubtitle: 'পূজা বুক করুন, মন্দিরের সাথে সংযোগ করুন', phonePlaceholder: 'ফোন নম্বর লিখুন', otpPlaceholder: 'OTP লিখুন', sendOtp: 'OTP পাঠান', verifyOtp: 'OTP যাচাই করুন', loginWithGoogle: 'Google দিয়ে চালিয়ে যান' },
  home: { greeting: 'নমস্কার, {{name}}', searchPlaceholder: 'মন্দির, পূজা, পণ্ডিত খুঁজুন...', featuredTemples: 'বৈশিষ্ট্যযুক্ত মন্দির', trendingPujas: 'ট্রেন্ডিং পূজা', bookPuja: 'পূজা বুক করুন', bookYatra: 'যাত্রা বুক করুন', liveDarshan: 'লাইভ দর্শন', dailyHoroscope: 'দৈনিক রাশিফল', donations: 'দান' },
  temples: { title: 'মন্দির', nearby: 'কাছের মন্দির', popular: 'জনপ্রিয় মন্দির', city: 'শহর', state: 'রাজ্য', deity: 'দেবতা', rating: 'রেটিং', reviews: 'পর্যালোচনা', about: 'মন্দির সম্পর্কে' },
  booking: { selectDeity: 'দেবতা নির্বাচন করুন', selectTemple: 'মন্দির নির্বাচন করুন', selectRitual: 'অনুষ্ঠান নির্বাচন করুন', selectPackage: 'প্যাকেজ নির্বাচন করুন', selectDate: 'তারিখ নির্বাচন করুন', selectTime: 'সময় নির্বাচন করুন', addDevotees: 'ভক্তের বিবরণ', review: 'পর্যালোচনা', payment: 'পেমেন্ট', confirmation: 'বুকিং নিশ্চিত!', basic: 'বেসিক', standard: 'স্ট্যান্ডার্ড', premium: 'প্রিমিয়াম', gotra: 'গোত্র', totalAmount: 'মোট পরিমাণ', confirmBooking: 'বুকিং নিশ্চিত করুন', bookingId: 'বুকিং ID', status: 'অবস্থা' },
  payment: { title: 'পেমেন্ট', upi: 'UPI', card: 'কার্ড', netbanking: 'নেট ব্যাংকিং', wallet: 'ওয়ালেট', pay: '₹{{amount}} পরিশোধ করুন', success: 'পেমেন্ট সফল!', failed: 'পেমেন্ট ব্যর্থ' },
  profile: { title: 'প্রোফাইল', myBookings: 'আমার বুকিং', family: 'পরিবারের সদস্য', language: 'ভাষা', logout: 'লগ আউট' },
};

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, hi: { translation: hi }, bn: { translation: bn } },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  compatibilityJSON: 'v3',
});

export default i18n;
