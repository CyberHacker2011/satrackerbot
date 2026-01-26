-- Create telegram_users table
CREATE TABLE IF NOT EXISTS telegram_users (
  telegram_id BIGINT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  language TEXT NOT NULL DEFAULT 'uz' CHECK (language IN ('uz', 'ru', 'en')),
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create telegram_feedback table
CREATE TABLE IF NOT EXISTS telegram_feedback (
  id UUID PRIMARY KEY,
  user_telegram_id BIGINT NOT NULL REFERENCES telegram_users(telegram_id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  admin_reply TEXT,
  replied_at TIMESTAMP WITH TIME ZONE
);

-- Create telegram_premium_requests table
CREATE TABLE IF NOT EXISTS telegram_premium_requests (
  id UUID PRIMARY KEY,
  user_telegram_id BIGINT NOT NULL REFERENCES telegram_users(telegram_id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('1month', '3month')),
  price INTEGER NOT NULL,
  receipt_file_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  admin_note TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_telegram_users_email ON telegram_users(email);
CREATE INDEX IF NOT EXISTS idx_telegram_feedback_user ON telegram_feedback(user_telegram_id);
CREATE INDEX IF NOT EXISTS idx_telegram_feedback_created ON telegram_feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_telegram_premium_user ON telegram_premium_requests(user_telegram_id);
CREATE INDEX IF NOT EXISTS idx_telegram_premium_status ON telegram_premium_requests(status);
CREATE INDEX IF NOT EXISTS idx_telegram_premium_created ON telegram_premium_requests(created_at DESC);

-- Add Row Level Security (RLS) policies if needed
-- ALTER TABLE telegram_users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE telegram_feedback ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE telegram_premium_requests ENABLE ROW LEVEL SECURITY;
