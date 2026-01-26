import dotenv from 'dotenv';
import path from 'path';
import { BotConfig } from './types';

// Load from .env.local file
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

export function loadConfig(): BotConfig {
  const requiredVars = [
    'TELEGRAM_BOT_TOKEN',
    'ADMIN_CHAT_ID',
    'ADMIN_PASSWORD',
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'CARD_NUMBER',
    'CARD_HOLDER_NAME'
  ];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  }

  return {
    botToken: process.env.TELEGRAM_BOT_TOKEN!,
    adminChatId: parseInt(process.env.ADMIN_CHAT_ID!, 10),
    adminPassword: process.env.ADMIN_PASSWORD!,
    supabaseUrl: process.env.SUPABASE_URL!,
    supabaseKey: process.env.SUPABASE_ANON_KEY!,
    cardNumber: process.env.CARD_NUMBER!,
    cardHolder: process.env.CARD_HOLDER_NAME!
  };
}

export const config = loadConfig();
