# 🛕 Divyaasirwad — Spiritual Services Marketplace

> A production-ready spiritual services platform connecting devotees with temples, pandits, and sacred rituals.

![CI](https://github.com/abin54/divyaasirwad/workflows/CI/badge.svg)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue)
![Stack](https://img.shields.io/badge/stack-Firebase%20%7C%20React%20Native%20%7C%20Expo-green)
![Payments](https://img.shields.io/badge/payments-Razorpay-orange)
![Tests](https://img.shields.io/badge/tests-33%20passing-brightgreen)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DIVYAASIRWAD                              │
├─────────────────────────────────────────────────────────────┤
│  Mobile App              │   React Native + Expo            │
│  Admin Dashboard         │   React + Vite (Firebase Hosting)│
│  Design System           │   Token-based, accessible UI     │
│  Shared Package          │   Types, constants, XState       │
│  Firebase Functions      │   Node.js 18, callable HTTPS     │
│  Firestore               │   NoSQL, real-time, indexed      │
│  Firebase Auth           │   Phone OTP + Google Sign-In     │
│  Firebase Storage        │   Puja photos, profile images    │
│  Firebase Hosting        │   Admin dashboard                │
│  Firebase Cloud Messaging│   Push notifications             │
│  Firebase Crashlytics    │   Crash reporting                │
│  Firebase Analytics      │   Event tracking                 │
│  CI/CD                   │   GitHub Actions + Firebase CLI  │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
divyaasirwad/
├── packages/
│   ├── api/                    # Firebase Functions (backend)
│   │   ├── src/
│   │   │   ├── auth/           # OTP, Google login, profile
│   │   │   ├── bookings/       # Booking CRUD, state transitions
│   │   │   ├── temples/        # Temple listing, search, nearby
│   │   │   ├── rituals/        # Ritual catalog, recommendations
│   │   │   ├── payments/       # Razorpay order, verify
│   │   │   ├── notifications/  # FCM push, Firestore triggers
│   │   │   ├── admin/          # Dashboard stats, user management
│   │   │   └── lib/            # Firebase init, errors, validation, observability
│   │   ├── __tests__/          # Jest + firebase-functions-test (4 tests)
│   │   └── jest.config.js      # ts-jest preset
│   │
│   ├── mobile/                 # React Native app (Expo)
│   │   ├── src/
│   │   │   ├── features/       # Feature-based screens (auth, home, bookings...)
│   │   │   ├── shared/         # Store (zustand), services, i18n, hooks, utils
│   │   │   ├── navigation/     # Stack + Tab navigation
│   │   │   └── assets/         # Icons, images
│   │   ├── __tests__/          # Screen integration tests (2 tests)
│   │   ├── __mocks__/          # Manual mocks (async-storage)
│   │   ├── jest.config.js      # React Native jest preset
│   │   └── babel.config.js     # babel-preset-expo
│   │
│   ├── design-system/          # Reusable UI components + tokens
│   │   ├── src/
│   │   │   ├── tokens/         # Colors, spacing, typography, shadows
│   │   │   ├── components/     # Button, Input, Card, Text
│   │   │   ├── providers/      # ThemeProvider
│   │   │   └── hooks/          # useTheme
│   │   ├── __tests__/          # Component tests (12 tests)
│   │   ├── jest.config.js      # React Native jest preset
│   │   └── babel.config.js     # @react-native/babel-preset
│   │
│   ├── shared/                 # Cross-package shared code
│   │   ├── src/
│   │   │   ├── types/          # TypeScript interfaces (Booking, User, etc.)
│   │   │   ├── constants/      # Deities, festivals, config values
│   │   │   ├── utils/          # ID generation, formatting, validation
│   │   │   └── state-machine/  # XState booking state machine
│   │   ├── __tests__/          # Unit tests (15 tests)
│   │   └── jest.config.js      # ts-jest preset
│   │
│   └── admin/                  # React + Vite admin dashboard
│       ├── src/
│       │   ├── App.tsx         # Toast notifications, responsive sidebar, zero inline styles
│       │   ├── components/     # A11yIcon, ErrorBoundary
│       │   ├── pages/          # Dashboard, Bookings, Temples, Pandits
│       │   ├── hooks/          # useAuth, useBookings
│       │   └── services/       # Firebase admin SDK client
│       ├── index.html          # Favicon (SVG data URI), OG meta tags, theme-color
│       └── public/             # images/, fonts/
│
├── infra/
│   └── firebase/               # Firestore rules, indexes, storage rules
│
├── .github/workflows/          # CI/CD pipelines
│   └── ci.yml                  # Lint → Test → Build → Deploy
│
├── .eslintrc.cjs               # Root ESLint (TypeScript/React rules)
├── .prettierrc                 # Prettier (120 width, single quotes, trailing commas)
├── .lighthouserc.js            # Lighthouse CI (0.9 thresholds)
├── .env.example                # All required config vars
├── LICENSE                     # MIT
├── firebase.json               # Firebase project config
├── package.json                # Root workspace config
└── README.md
```

## Key Decisions

### Why Firebase (not MongoDB/Express)?
- **Zero server management** — no EC2, no Docker orchestration
- **Built-in auth** — phone OTP, Google, Apple out of the box
- **Real-time** — Firestore listeners for live puja updates
- **Scalable** — auto-scales from 0 to millions of requests
- **Cost-effective** — pay-per-use, generous free tier
- **Integrated ecosystem** — Auth + Firestore + Storage + Messaging + Crashlytics + Analytics

### Booking State Machine (XState)
```
draft → pending → confirmed → in_progress → completed
                  ↓              ↓
              cancelled      cancellation_review
                  ↓              ↓
              refunded      confirmed / cancelled
```

- **Explicit transitions** — no invalid state jumps
- **Refund policy** — encoded in state machine
- **Side effects** — notifications triggered on state changes
- **Testable** — pure state transitions

### Design System
- **Token-based** — colors, spacing, typography as design tokens
- **Accessible** — proper ARIA labels, contrast ratios, touch targets
- **Composable** — Button, Input, Card, Text primitives
- **Themeable** — dark mode ready, multi-brand support

## Getting Started

### Prerequisites
- Node.js >= 18 (Node 20+ works with `--legacy-peer-deps`)
- npm >= 9
- Firebase CLI (`npm install -g firebase-tools`)
- Expo CLI (`npm install -g expo-cli`) — for mobile development

### Installation

```bash
# Clone and install
git clone https://github.com/abin54/divyaasirwad.git
cd divyaasirwad

# Install dependencies (use --legacy-peer-deps --ignore-scripts on Windows)
npm install

# Copy environment template
cp .env.example .env
# Fill in your Firebase, Razorpay, Twilio, SendGrid keys
```

### Development

```bash
# Start Firebase emulators (local Firebase backend)
npm run emulators

# Run mobile app (Expo)
npm run dev:mobile

# Run admin dashboard
npm run dev:admin

# Run all tests (33 tests across 4 packages)
npm run test

# Type-check all packages
npm run typecheck

# Lint all packages
npm run lint
```

### Deploy

```bash
# Deploy Firebase Functions
npm run deploy:api

# Deploy admin dashboard to Firebase Hosting
npm run deploy:hosting

# Or deploy everything via CI (push to main triggers GitHub Actions)
```

## CI/CD Pipeline

```
push/PR → lint + typecheck → test (33 tests) → build → deploy (main only)
```

- **Lint & Typecheck**: ESLint + Prettier + `tsc --noEmit` on every push/PR
- **Tests**: Jest across all 4 packages (7 suites, 33 tests)
- **Build**: TypeScript compilation for API, shared, design-system; Vite for admin
- **Deploy**: Firebase Functions + Hosting on `main` branch pushes

## Testing

### Test Suites

| Package | Tests | Description |
|---------|-------|-------------|
| `@divyaasirwad/shared` | 15 | State machine, utils, constants |
| `@divyaasirwad/api` | 4 | Auth functions (sendOtp, verifyOtp) |
| `@divyaasirwad/design-system` | 12 | Button, Input component rendering |
| `@divyaasirwad/mobile` | 2 | OtpScreen integration |
| **Total** | **33** | **All passing** |

```bash
# Run all tests
npm run test

# Run specific package tests
npm run test --workspace=@divyaasirwad/api
npm run test --workspace=@divyaasirwad/shared
npm run test --workspace=@divyaasirwad/design-system
npm run test --workspace=@divyaasirwad/mobile
```

### Test Infrastructure

- **API tests**: Use `firebase-functions-test` with `firebase-admin` mocked via `jest.doMock` + `jest.resetModules` to avoid live GCP credential fetch
- **Design-system & Mobile**: React Native jest environment (`react-native/jest/setup.js`, `react-native/jest/react-native-env.js`) with `@react-native/babel-preset` / `babel-preset-expo` transforms
- **Shared**: Standard `ts-jest` preset
- **Mocks**: `firebase-admin` (auth, firestore, storage, messaging), `@react-native-async-storage/async-storage`, `@react-navigation/native`, `react-native-safe-area-context`

## Observability

- **Firebase Crashlytics** — crash reports, ANR tracking
- **Firebase Analytics** — user events, funnel analysis
- **Structured logging** — Firebase Cloud Logging with context (timestamps, levels, error details)
- **Performance monitoring** — function execution time tracking with `measurePerformance`
- **Firestore indexes** — pre-built for all query patterns

## Security

- **Firestore Rules** — role-based access (user, pandit, admin, superadmin)
- **Storage Rules** — authenticated-only uploads
- **Callable Functions** — Firebase Auth validation on protected endpoints
- **Input Validation** — Zod schemas on all API endpoints
- **Rate Limiting** — Firebase App Check ready
- **Sensitive data** — phone numbers masked in logs (`9876****`)

## Admin Dashboard

- **Zero inline styles** — all styling via CSS custom properties and utility classes
- **Toast notification system** — replaces all `alert()` calls
- **Responsive layout** — hamburger menu with off-canvas sidebar on mobile
- **Accessibility** — `aria-current`, `role="alert"`, `scope="col"`, `:focus-visible`, `.sr-only`, `A11yIcon` with `role="img"` + `aria-label`
- **Lighthouse CI** — 0.9 thresholds for performance, accessibility, SEO
- **Favicon** — emoji-based SVG data URI (zero-dependency)

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Required | Service |
|----------|----------|---------|
| `FIREBASE_PROJECT_ID` | Yes | Firebase |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Yes | Payments |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` | Yes | SMS |
| `SENDGRID_API_KEY` | Yes | Email |
| `GOOGLE_CLIENT_ID` | Yes | Auth |
| `EXPO_PUBLIC_FIREBASE_*` | Yes | Mobile app |

## Monetization

| Stream | Model | Margin |
|--------|-------|--------|
| Commission on Pujas | 15-25% per booking | Primary |
| Commission on Yatras | 10-15% per booking | High-value |
| Temple Listing Fees | ₹5,000-₹25,000/month | Recurring |
| Pandit Subscription | ₹1,000-₹5,000/month | Recurring |
| Featured Listings | Sponsored placements | High margin |
| Donation Processing | 2-5% platform fee | Volume-based |

## License

MIT © Divyaasirwad
