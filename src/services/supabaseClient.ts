import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config';
import { User, Feedback, PremiumRequest } from '../types';

export const supabase: SupabaseClient = createClient(
  config.supabaseUrl,
  config.supabaseKey
);

// Database table names
export const TABLES = {
  USERS: 'telegram_users',
  FEEDBACK: 'telegram_feedback',
  PREMIUM: 'telegram_premium_requests'
};
