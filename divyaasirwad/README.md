# 🛕 Divyaasirwad — Spiritual Services Marketplace

> A production-ready spiritual services platform connecting devotees with temples, pandits, and sacred rituals.

![CI](https://github.com/abin54/divyaasirwad/workflows/CI/badge.svg)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue)
![Stack](https://img.shields.io/badge/stack-Firebase%20%7C%20React%20Native%20%7C%20Expo-green)
![Payments](https://img.shields.io/badge/payments-Razorpay-orange)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DIVYAASIRWAD                              │
├─────────────────────────────────────────────────────────────┤
│  Mobile App              │   React Native + Expo            │
│  Design System           │   Token-based, accessible UI     │
│  Shared Package          │   Types, constants, XState       │
│  Firebase Functions       │   Node.js 18, callable HTTPS     │
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
│   │   └── __tests__/          # Firebase emulator tests
│   │
│   ├── mobile/                 # React Native app (Expo)
│   │   ├── src/
│   │   │   ├── features/       # Feature-based screens (auth, home, bookings...)
│   │   │   ├── shared/         # Store, services, i18n, hooks, utils
│   │   │   ├── navigation/     # Stack + Tab navigation
│   │   │   └── assets/         # Icons, images
│   │   └── __tests__/          # Component + integration tests
│   │
│   ├── design-system/          # Reusable UI components + tokens
│   │   ├── src/
│   │   │   ├── tokens/         # Colors, spacing, typography, shadows
│   │   │   ├── components/     # Button, Input, Card, Text
│   │   │   ├── providers/      # ThemeProvider
│   │   │   └── hooks/          # useTheme
│   │   └── __tests__/          # Component tests
│   │
│   ├── shared/                 # Cross-package shared code
│   │   ├── src/
│   │   │   ├── types/          # TypeScript interfaces (Booking, User, etc.)
│   │   │   ├── constants/      # Deities, festivals, config values
│   │   │   ├── utils/          # ID generation, formatting, validation
│   │   │   └── state-machine/  # XState booking state machine
│   │   └── __tests__/          # Unit tests
│   │
│   └── admin/                  # React admin dashboard
│
├── infra/
│   └── firebase/               # Firestore rules, indexes, storage rules
│
├── .github/workflows/          # CI/CD pipelines
│   └── ci.yml                  # Lint → Test → Build → Deploy
│
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

```bash
# Install dependencies
npm install

# Start Firebase emulators (local development)
npm run emulators

# Run mobile app
npm run dev:mobile

# Run admin dashboard
npm run dev:admin

# Deploy to Firebase
npm run deploy:api
npm run deploy:hosting
```

## CI/CD Pipeline

```
push/PR → lint + typecheck → test → build → deploy (main only)
```

- **Lint & Typecheck**: Every push/PR
- **Tests**: Jest with Firebase emulator
- **Build**: TypeScript compilation
- **Deploy**: Firebase Functions + Hosting on `main`

## Observability

- **Firebase Crashlytics** — crash reports, ANR tracking
- **Firebase Analytics** — user events, funnel analysis
- **Structured logging** — Firebase Cloud Logging with context
- **Performance monitoring** — function execution time tracking
- **Firestore indexes** — pre-built for all query patterns

## Testing

```bash
# All tests
npm run test

# CI tests with coverage
npm run test:ci

# Firebase emulator tests
npm run emulators
npm run test --workspace=packages/api
```

- **Shared**: Unit tests for utils, state machine
- **Design System**: Component tests with React Native Testing Library
- **Mobile**: Screen integration tests
- **API**: Firebase emulator-based function tests

## Security

- **Firestore Rules** — role-based access control
- **Storage Rules** — authenticated-only uploads
- **Callable Functions** — Firebase Auth validation
- **Input Validation** — Zod schemas on all endpoints
- **Rate Limiting** — Firebase App Check ready

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
