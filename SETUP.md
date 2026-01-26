# Quick Setup Guide

## Step 1: Install Dependencies ✅
```bash
pnpm install
```

## Step 2: Configure Environment Variables

You need to fill in your `.env.local` file with the following:

### Required Variables:

1. **TELEGRAM_BOT_TOKEN**
   - Get from [@BotFather](https://t.me/botfather)
   - Create a new bot: `/newbot`
   - Copy the token

2. **ADMIN_CHAT_ID**
   - Your Telegram user ID
   - Get it from [@userinfobot](https://t.me/userinfobot)
   - Send `/start` and copy your ID

3. **ADMIN_PASSWORD**
   - Already set to: `Hech_qaysi_1`
   - You can change it if needed

4. **SUPABASE_URL** and **SUPABASE_ANON_KEY**
   - Copy from your `sat-tracker/.env.local` file
   - These should match your existing Supabase project

5. **CARD_NUMBER** and **CARD_HOLDER_NAME**
   - Your payment card details for premium subscriptions
   - Example: `8600 1234 5678 9012`

### Example `.env.local`:
```env
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
ADMIN_CHAT_ID=123456789
ADMIN_PASSWORD=Hech_qaysi_1
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
CARD_NUMBER=8600 1234 5678 9012
CARD_HOLDER_NAME=John Doe
```

## Step 3: Set Up Database

Run the SQL schema in your Supabase dashboard:
- Go to Supabase SQL Editor
- Copy content from `database/schema.sql`
- Execute the queries

## Step 4: Build and Run

```bash
# Build TypeScript
pnpm run build

# Run the bot
pnpm start

# OR run in development mode
pnpm run dev
```

## Testing the Bot

### User Flow:
1. Find your bot on Telegram
2. Send `/start` - will ask for email
3. Enter your email (e.g., `test@example.com`)
4. Try `/feedback` - send feedback
5. Try `/premium` - view subscription plans
6. Try `/language` - change language

### Admin Flow:
1. Send `/aytmayman` (secret command)
2. Enter password: `Hech_qaysi_1`
3. You'll get admin access
4. When users send feedback, you'll receive it
5. Reply directly to forward your message to the user
6. When users request premium, you'll get notification
7. Click approve/reject buttons

## Troubleshooting

- **Bot not responding**: Check if `TELEGRAM_BOT_TOKEN` is correct
- **Database errors**: Verify Supabase credentials and run schema.sql
- **Admin not working**: Ensure `ADMIN_CHAT_ID` matches your Telegram ID

## Next Steps

After the bot is running:
1. Test all commands as a regular user
2. Test admin features
3. Verify database tables are being populated
4. Check that notifications work correctly
