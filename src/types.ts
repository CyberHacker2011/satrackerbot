export type Language = 'uz' | 'ru' | 'en';

export interface User {
  telegram_id: number;
  email: string;
  language: Language;
  is_admin: boolean;
  created_at: string;
}

export interface Feedback {
  id: string;
  user_telegram_id: number;
  user_email: string;
  message: string;
  created_at: string;
  admin_reply?: string;
  replied_at?: string;
}

export interface PremiumRequest {
  id: string;
  user_telegram_id: number;
  user_email: string;
  plan_type: '1month' | '3month';
  price: number;
  receipt_file_id?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  processed_at?: string;
  admin_note?: string;
}

export interface UserSession {
  telegram_id: number;
  state: 'idle' | 'awaiting_email' | 'awaiting_password' | 'awaiting_feedback' | 'awaiting_receipt' | 'admin_replying_feedback' | 'admin_messaging_user';
  context?: any;
}

export interface BotConfig {
  botToken: string;
  adminChatId: number;
  adminPassword: string;
  supabaseUrl: string;
  supabaseKey: string;
  cardNumber: string;
  cardHolder: string;
}
