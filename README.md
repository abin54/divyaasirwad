# 🛕 DivineConnect — Spiritual Services Marketplace

> A modern spiritual services marketplace app connecting devotees with temples, pandits, and sacred rituals — inspired by Sri Mandir and Ghar Mandir.

![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue)
![Stack](https://img.shields.io/badge/stack-React%20Native%20%7C%20Node.js%20%7C%20MongoDB-green)
![Payments](https://img.shields.io/badge/payments-Razorpay-orange)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Architecture](#-api-architecture)
- [User Flows](#-user-flows)
- [Monetization Model](#-monetization-model)
- [MVP Roadmap](#-mvp-roadmap)
- [Marketing Strategy](#-marketing-strategy)
- [Getting Started](#-getting-started)

---

## ✨ Features

### Core Features
| Feature | Description |
|---------|-------------|
| **User Authentication** | Mobile OTP login (Twilio), Google login (Firebase Auth) |
| **Temple Discovery** | Browse by city/state, filter by deity, GPS-based nearby search |
| **Puja Booking** | 5-step flow: Deity → Temple → Ritual → Date/Time → Payment |
| **Devotee Management** | Add family members, gotra, zodiac details |
| **Live Updates** | Real-time status, photos/videos of completed puja |
| **Prasad Delivery** | End-to-end tracking with courier integration |
| **Yatra Bookings** | Pilgrimage packages with transport + stay + darshan |
| **Pandit Dashboard** | Accept/reject bookings, manage schedule, upload media |
| **Admin Panel** | Manage temples, pandits, orders, payments analytics |
| **Multi-language** | English, Hindi, Bengali with i18n support |
| **Reviews & Ratings** | Verified purchase reviews with media uploads |
| **Chat System** | Real-time chat between users, pandits, and support |

### Additional Features (Future)
- Daily horoscope & panchang
- Devotional music & mantra streaming
- Live darshan via WebRTC
- AI-based ritual recommendations
- QR-based temple check-in
- Monthly subscription for daily aartis
- Donation system (annadanam, infrastructure)

---

## 🛠 Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│                    DIVINECONNECT                         │
├─────────────────────────────────────────────────────────┤
│  Frontend (Mobile)       │   React Native + Expo        │
│  Frontend (Admin)        │   React + MUI                │
│  Backend                 │   Node.js + Express + TS     │
│  Database                │   MongoDB + Mongoose         │
│  Cache                   │   Redis                      │
│  Auth                    │   Firebase Auth + JWT        │
│  Payments                │   Razorpay + Stripe          │
│  SMS/Notifications       │   Twilio + Firebase Cloud   │
│  File Storage            │   Cloudinary                 │
│  Maps                    │   Google Maps API            │
│  Real-time               │   Socket.IO                  │
│  Email                   │   Nodemailer                 │
│  Orchestration           │   Docker Compose             │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
divineconnect/
├── backend/                          # Node.js + Express API
│   ├── src/
│   │   ├── config/                   # Environment & service configs
│   │   ├── controllers/              # Route handlers
│   │   ├── middleware/               # Auth, upload, error handling
│   │   ├── models/                   # Mongoose schemas
│   │   ├── routes/                   # API route definitions
│   │   ├── services/                 # Business logic (payments, notifications)
│   │   ├── utils/                    # Helpers, response formatters
│   │   ├── validators/               # Request validation
│   │   └── server.ts                 # Entry point
│   ├── uploads/                      # Local file uploads
│   └── package.json
│
├── frontend/                         # React Native (Expo)
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── common/               # Button, Card, Header, Input
│   │   │   ├── home/                 # FeaturedCard, PujaCard
│   │   │   └── booking/              # BookingStepper
│   │   ├── constants/                # Theme, deities, rituals, API
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── i18n/                     # Translations (en, hi, bn)
│   │   ├── navigation/              # Stack + Tab navigation
│   │   ├── screens/                  # All app screens
│   │   │   ├── auth/                 # Login, OTP, Onboarding
│   │   │   ├── home/                 # Home, Search
│   │   │   ├── temples/              # List, Detail
│   │   │   ├── rituals/              # List, Detail
│   │   │   ├── booking/              # 5-step booking flow
│   │   │   ├── payments/             # Payment, Success
│   │   │   ├── profile/              # Profile, Bookings, Family
│   │   │   ├── yatra/                # YatraList
│   │   │   └── pandit/               # PanditDashboard
│   │   ├── services/                 # API client (axios)
│   │   └── store/                    # Zustand state management
│   ├── App.tsx
│   └── package.json
│
├── admin/                            # React Admin Dashboard
│   ├── src/
│   │   ├── components/               # Sidebar, Charts
│   │   ├── pages/                    # Dashboard, Temples, Pandits,
│   │   │                             # Bookings, Payments, Users, Analytics
│   │   └── App.tsx
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## 🗄️ Database Schema

### Core Collections

```javascript
// Users
User {
  _id, phone, email, password, name, photo, language,
  role: 'user' | 'pandit' | 'temple_admin' | 'admin' | 'superadmin',
  isPhoneVerified, isEmailVerified,
  firebaseUid, googleId,
  familyMembers: [{ name, relation, gotra, zodiac, dob, isPrimary }],
  addresses: [{ label, address, city, state, pincode, isDefault }],
  preferences: { notifications, emailUpdates, smsUpdates, language },
  fcmTokens: [],
  isActive, isDeleted, lastLogin,
  timestamps
}

// Deities
Deity {
  _id, name, nameHi, nameBn, slug,
  description, descriptionHi, descriptionBn,
  image, icon, category: 'primary'|'avatar'|'form'|'other',
  associatedMantra, associatedColors, festivals,
  isActive, order
}

// Temples
Temple {
  _id, name, nameHi, nameBn, slug,
  description, shortDescription,
  images, mainImage,
  deity, deities: [],
  address: { street, area, city, state, pincode, country },
  location: { type: 'Point', coordinates: [lng, lat] },
  contact: { phone, email, website },
  timings: { morning: {open, close}, evening: {open, close}, aartiTimings: [] },
  facilities, category: 'local'|'pilgrimage'|'famous'|'historic',
  rating, reviewCount, totalBookings,
  isVerified, pandits: [],
  pricing: { minPujaPrice, maxPujaPrice },
  gallery, videos, festivals,
  isActive, isDeleted, createdBy,
  timestamps
}

// Rituals
Ritual {
  _id, name, nameHi, nameBn, slug,
  description, descriptionHi, descriptionBn, shortDescription,
  category: 'puja'|'hawan'|'aarti'|'sanskar'|'tarpan'|'daily'|'festival',
  type: 'home'|'temple'|'both',
  deity, associatedDeities: [],
  image, icon,
  pricing: { basic, standard, premium },
  duration: { basic, standard, premium },
  includes, requirements, samagri,
  benefits, benefitsHi, benefitsBn,
  muhurta, instructions,
  isPopular, isTrending, isActive, order
}

// Bookings
Booking {
  _id, bookingId,
  user, temple, pandit, ritual, deity,
  packageType: 'basic'|'standard'|'premium',
  type: 'home'|'temple',
  address, devotees: [{ name, gotra, relation, zodiac }],
  scheduledDate, scheduledTime, muhurta,
  amount, discount, couponCode, totalAmount,
  status: 'pending'|'confirmed'|'in_progress'|'completed'|'cancelled'|'refunded',
  paymentStatus: 'pending'|'paid'|'failed'|'refunded',
  payment, specialRequests,
  completionMedia: [{ type:'image'|'video', url, uploadedAt }],
  isReviewed,
  prasadDelivery: { trackingId, courierPartner, status, estimatedDelivery, trackingUrl },
  cancelledBy, cancellationReason, cancelledAt, refundAmount,
  liveStreamUrl,
  timestamps
}

// Payments
Payment {
  _id, paymentId, booking, user,
  amount, currency,
  gateway: 'razorpay'|'stripe'|'wallet',
  gatewayPaymentId, gatewayOrderId, gatewaySignature,
  method: 'upi'|'card'|'netbanking'|'wallet',
  status: 'created'|'attempted'|'paid'|'failed'|'refunded',
  refundId, refundAmount, refundReason, refundedAt,
  notes: {},
  timestamps
}

// Additional collections: Yatra, Donation, Review, Notification, Coupon, Chat
```

---

## 🌐 API Architecture

### Base URL: `/api/v1`

| Module | Endpoints | Auth |
|--------|-----------|------|
| **Auth** | `POST /auth/send-otp`, `POST /auth/verify-otp`, `POST /auth/google`, `POST /auth/refresh-token`, `GET /auth/profile`, `PUT /auth/profile`, `POST /auth/family`, `POST /auth/fcm-token`, `POST /auth/logout` | Mixed |
| **Temples** | `GET /temples`, `GET /temples/featured`, `GET /temples/cities`, `GET /temples/search?q=`, `GET /temples/:slug`, `GET /temples/id/:id` | Public |
| **Pujas** | `GET /pujas/rituals`, `GET /pujas/rituals/trending`, `GET /pujas/rituals/:slug`, `GET /pujas/deities`, `GET /pujas/deities/:slug`, `GET /pujas/recommendations?purpose=` | Public |
| **Bookings** | `POST /bookings`, `GET /bookings`, `GET /bookings/all`, `GET /bookings/pandit`, `GET /bookings/tracking/:bookingId`, `GET /bookings/:id`, `PUT /bookings/:id/cancel`, `PUT /bookings/:id/status`, `POST /bookings/:id/media` | JWT |
| **Payments** | `POST /payments/create-order`, `POST /payments/verify`, `GET /payments/transactions`, `GET /payments/:paymentId`, `POST /payments/:id/refund` | JWT |
| **Yatras** | `GET /yatras`, `GET /yatras/featured`, `GET /yatras/:slug` | Public |
| **Admin** | `GET /admin/dashboard`, `GET /admin/analytics`, `GET /admin/users`, `PUT /admin/users/:id/role`, `PUT /admin/users/:id/toggle-status` | Admin |
| **Health** | `GET /api/v1/health` | Public |

### Authentication Flow
```
Mobile: Phone → Send OTP → Verify OTP → JWT Token
Google: Google Login → Firebase Auth → JWT Token
All subsequent requests: Authorization: Bearer <token>
```

---

## 👤 User Flows

### 📿 Puja Booking Flow
```
Home → Browse Deities → Select Deity → Select Temple → 
Select Ritual & Package → Select Date & Time → 
Add Devotee Details → Review Summary → 
Payment (UPI/Card/NetBanking) → Booking Confirmation → 
Live Updates via Notifications → Puja Completion Photos → 
Prasad Delivery Tracking
```

### 🚌 Yatra Booking Flow
```
Browse Yatras → View Itinerary → Select Package → 
Select Dates → Add Devotees → Payment → 
Travel & Stay Confirmation → Live Updates → 
Post-Yatra Review
```

### 🙏 Prasad Delivery Flow
```
Puja Completed → Prasad Packed → 
Courier Dispatched → Tracking Available → 
In Transit → Delivered → Review
```

---

## 💰 Monetization Model

| Revenue Stream | Model | Margin |
|----------------|-------|--------|
| **Commission on Pujas** | 15-25% per booking | Primary |
| **Commission on Yatras** | 10-15% per booking | High-value |
| **Temple Listing Fees** | ₹5,000-₹25,000/month | Recurring |
| **Pandit Subscription** | ₹1,000-₹5,000/month | Recurring |
| **Featured Listings** | Sponsored placements | High margin |
| **Festival Campaigns** | Premium during peak seasons | Seasonal |
| **Donation Processing** | 2-5% platform fee | Volume-based |
| **Prasad Delivery** | Shipping markup | Low margin |
| **Subscription (Monthly Puja)** | ₹500-₹2,000/month | Recurring |
| **Premium Listings** | Temples/Pandits pay for visibility | High margin |

### Projected Unit Economics
- **Avg. Booking Value**: ₹1,500-₹3,000
- **Platform Commission**: 20%
- **Avg. Revenue per Booking**: ₹300-₹600
- **Customer Acquisition Cost**: ₹150-₹300 (digital)
- **Target LTV:CAC Ratio**: 5:1
- **Target Monthly Active Users (Year 1)**: 50,000
- **Target Monthly Revenue (Year 1)**: ₹30-50 Lakhs

---

## 🗺️ MVP Roadmap

### Phase 1: Foundation (Weeks 1-4)
- [x] Project setup & architecture
- [x] Database schema design
- [x] User authentication (OTP + Google)
- [ ] Temple listing CRUD
- [ ] Basic puja catalog
- [ ] Simple booking flow

### Phase 2: Core Features (Weeks 5-8)
- [ ] Complete booking flow (5-step)
- [ ] Payment integration (Razorpay)
- [ ] User dashboard & booking history
- [ ] Pandit onboarding & dashboard
- [ ] Admin panel (basic)

### Phase 3: Enhancement (Weeks 9-12)
- [ ] Live updates & notifications
- [ ] Photo/video upload for completed pujas
- [ ] Review & rating system
- [ ] Multi-language support (EN/HI/BN)
- [ ] Search & filtering improvements
- [ ] Prasad delivery tracking

### Phase 4: Scale (Weeks 13-16)
- [ ] Yatra booking module
- [ ] Donation system
- [ ] Chat system (Socket.IO)
- [ ] AI-based ritual recommendations
- [ ] Festival campaign engine
- [ ] Referral & loyalty program

### Phase 5: Advanced (Post-MVP)
- [ ] Live darshan streaming
- [ ] Daily horoscope & panchang
- [ ] Devotional music streaming
- [ ] Monthly subscription model
- [ ] QR-based temple check-in
- [ ] Multi-vendor pandit marketplace

---

## 📣 Marketing Strategy for Indian Spiritual Market

### Digital Marketing
- **Google Ads**: Target keywords like "online puja booking", "puja near me", "temple darshan"
- **YouTube Content**: Temple documentaries, puja explainers, pandit interviews
- **SEO**: Blog posts on festivals, rituals, temple guides
- **Social Media**: Instagram Reels (temple tours, puja timelapses), Facebook groups
- **Influencer Partnerships**: Spiritual influencers, religious leaders

### Offline Marketing
- **Temple Partnerships**: QR codes at temples, pamphlets
- **Pandit Referral Program**: Referral bonuses
- **Community Events**: Sponsor local aartis, distribute prasad
- **Print Media**: Ads in religious magazines, newspapers during festivals

### Seasonal Campaigns
| Festival | Campaign | Target |
|----------|----------|--------|
| Navratri | "9 Nights of Power" | Durga Puja bookings |
| Diwali | "Lakshmi at Your Doorstep" | Lakshmi Puja + donations |
| Shivratri | "The Night of Shiva" | Rudrabhishek bookings |
| Janmashtami | "Celebrate Krishna" | Krishna puja packages |
| Ganesh Chaturthi | "Welcome Bappa" | Ganesh sthapana |
| Pitru Paksha | "Honor Your Ancestors" | Tarpan & shraddha |

### Growth Hacks
- "Book 3 pujas, get 1 free" referral program
- Festival countdown notifications with discounts
- First-time user discount (₹200 off)
- Temple-specific loyalty points
- Prasad subscription boxes
- "Puja of the Day" flash deals

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+, MongoDB 7+, Redis 7+
- Expo CLI (`npm install -g expo-cli`)
- Razorpay & Firebase accounts

### Installation

```bash
# 1. Clone repository
git clone <repo-url>
cd divineconnect

# 2. Backend
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm run dev

# 3. Frontend (Mobile)
cd ../frontend
npm install
npx expo start

# 4. Admin Dashboard
cd ../admin
npm install
npm start
```

### Environment Variables (Backend)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/divineconnect
JWT_SECRET=your-super-secret-key
FIREBASE_PROJECT_ID=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
CLOUDINARY_CLOUD_NAME=
```

### Docker Deployment
```bash
docker-compose up -d
```

---

## 📄 License

MIT © DivineConnect

---

## 🙏 Support

For support, email support@divineconnect.app or join our spiritual community.
