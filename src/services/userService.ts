import { supabase, TABLES } from './supabaseClient';
import { User, Language } from '../types';
import { isValidEmail } from '../utils/validators';

export async function getUserByTelegramId(telegramId: number): Promise<User | null> {
  const { data, error } = await supabase
    .from(TABLES.USERS)
    .select('*')
    .eq('telegram_id', telegramId)
    .single();
  
  if (error) {
    // PGRST116 means "not found" - this is expected for unregistered users
    if (error.code !== 'PGRST116') {
      console.error('Error fetching user:', error);
    }
    return null;
  }
  
  return data;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabase
    .from(TABLES.USERS)
    .select('*')
    .eq('email', email)
    .single();
  
  if (error && error.code !== 'PGRST116') { // PGRST116 = not found
    console.error('Error fetching user by email:', error);
  }
  
  return data || null;
}

export async function authenticateUser(
  telegramId: number,
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; message?: string }> {
  if (!isValidEmail(email)) {
    return { success: false, message: 'Invalid email format' };
  }

  try {
    // Try to sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Check if user already has a telegram_id linked
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      // User exists, update telegram_id if different
      if (existingUser.telegram_id !== telegramId) {
        const { error: updateError } = await supabase
          .from(TABLES.USERS)
          .update({ telegram_id: telegramId })
          .eq('email', email);

        if (updateError) {
          return { success: false, message: 'Error updating user' };
        }
      }
      return { success: true, user: existingUser };
    } else {
      // Create new telegram user record
      const { data: newUser, error: createError } = await supabase
        .from(TABLES.USERS)
        .insert({
          telegram_id: telegramId,
          email,
          language: 'uz',
          is_admin: false,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (createError) {
        return { success: false, message: 'Error creating user record' };
      }

      return { success: true, user: newUser };
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, message: 'Authentication failed' };
  }
}

export async function createUser(
  telegramId: number,
  email: string,
  language: Language = 'uz'
): Promise<User | null> {
  if (!isValidEmail(email)) {
    return null;
  }
  
  const { data, error } = await supabase
    .from(TABLES.USERS)
    .insert({
      telegram_id: telegramId,
      email,
      language,
      is_admin: false,
      created_at: new Date().toISOString()
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating user:', error);
    return null;
  }
  
  return data;
}

export async function updateUserLanguage(
  telegramId: number,
  language: Language
): Promise<boolean> {
  const { error } = await supabase
    .from(TABLES.USERS)
    .update({ language })
    .eq('telegram_id', telegramId);
  
  if (error) {
    console.error('Error updating language:', error);
    return false;
  }
  
  return true;
}

export async function setUserAdmin(telegramId: number, isAdmin: boolean): Promise<boolean> {
  const { error } = await supabase
    .from(TABLES.USERS)
    .update({ is_admin: isAdmin })
    .eq('telegram_id', telegramId);
  
  if (error) {
    console.error('Error setting admin status:', error);
    return false;
  }
  
  return true;
}

