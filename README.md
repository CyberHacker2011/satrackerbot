# Telegram Feedback Bot

A feature-rich Telegram bot built with TypeScript that handles user feedback, premium subscriptions, email authentication, and multi-language support (Uzbek, Russian, English).

## Features

- 📧 **Email Authentication**: Users must register with email before using bot features
- 💬 **Anonymous Feedback System**: Users can send feedback that admins can reply to
- ⭐ **Premium Subscriptions**: Two-tier pricing (1-month and 3-month plans)
- 🌐 **Multi-language Support**: Uzbek (default), Russian, and English
- 👨‍💼 **Secure Admin Panel**: Secret access via `/aytmayman` with password protection
- 💳 **Payment Processing**: Receipt upload and manual admin approval

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:
- `TELEGRAM_BOT_TOKEN`: Get from [@BotFather](https://t.me/botfather)
- `ADMIN_CHAT_ID`: Your Telegram user ID (admin)
- `ADMIN_PASSWORD`: Password for admin access (default: `Hech_qaysi_1`)
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anon/public key
- `CARD_NUMBER`: Card number for payments
- `CARD_HOLDER_NAME`: Card holder name

### 3. Set Up Database

Create the following tables in your Supabase database:

#### `telegram_users` table
```sql
CREATE TABLE telegram_users (
  telegram_id BIGINT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  language TEXT NOT NULL DEFAULT 'uz',
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
```

#### `telegram_feedback` table
```sql
CREATE TABLE telegram_feedback (
  id UUID PRIMARY KEY,
  user_telegram_id BIGINT NOT NULL REFERENCES telegram_users(telegram_id),
  user_email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  admin_reply TEXT,
  replied_at TIMESTAMP WITH TIME ZONE
);
```

#### `telegram_premium_requests` table
```sql
CREATE TABLE telegram_premium_requests (
  id UUID PRIMARY KEY,
  user_telegram_id BIGINT NOT NULL REFERENCES telegram_users(telegram_id),
  user_email TEXT NOT NULL,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('1month', '3month')),
  price INTEGER NOT NULL,
  receipt_file_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  admin_note TEXT
);
```

### 4. Build and Run

```bash
# Development mode
pnpm run dev

# Production mode
pnpm run build
pnpm start
```

## User Commands

- `/start` - Register with email or login
- `/feedback` - Send anonymous feedback to admin
- `/premium` - View and purchase premium plans
- `/language` - Change language (Uzbek, Russian, English)

## Admin Commands

- `/aytmayman` - Secret admin access (password required)

## Usage Flow

### User Registration
1. User starts bot with `/start`
2. Bot requests email address
3. User enters valid email and gets registered

### Feedback System
1. User sends `/feedback`
2. User writes their feedback message
3. Admin receives anonymous feedback with user's email
4. Admin can reply directly, and the message goes back to the user

### Premium Subscription
1. User sends `/premium`
2. Bot displays two plan options with prices
3. User selects a plan
4. Bot shows card details and requests receipt upload
5. User uploads payment receipt
6. Admin receives notification with receipt
7. Admin approves or rejects the request
8. User gets notified of the decision

## Premium Plans

- **1 Month**: 34,540 UZS
  - Unlimited Study Plans
  - Advanced Analytics

- **3 Months**: 97,570 UZS (Best Offer)
  - Everything in Monthly Plan
  - Price lock for future updates

## Project Structure

```
satrackerbot/
├── src/
│   ├── commands/          # Command handlers
│   │   ├── start.ts
│   │   ├── feedback.ts
│   │   ├── premium.ts
│   │   ├── language.ts
│   │   └── admin.ts
│   ├── handlers/          # Event handlers
│   │   ├── callbackHandler.ts
│   │   └── messageHandler.ts
│   ├── services/          # Business logic
│   │   ├── userService.ts
│   │   ├── feedbackService.ts
│   │   ├── premiumService.ts
│   │   ├── paymentService.ts
│   │   ├── sessionService.ts
│   │   └── supabaseClient.ts
│   ├── localization/      # Translations
│   │   ├── index.ts
│   │   └── translations.ts
│   ├── utils/             # Utilities
│   │   ├── keyboards.ts
│   │   └── validators.ts
│   ├── config.ts          # Configuration
│   ├── types.ts           # TypeScript types
│   └── index.ts           # Entry point
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Security Notes

- Admin password is stored in `.env` file
- Admin path `/aytmayman` is not shown in command lists
- Users cannot see other users' feedback
- All payment processing requires manual admin approval

## License

ISC
"# satrackerbot" 
