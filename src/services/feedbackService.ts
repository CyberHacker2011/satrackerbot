import { supabase, TABLES } from './supabaseClient';
import { Feedback } from '../types';
import { v4 as uuidv4 } from 'uuid';

export async function createFeedback(
  userTelegramId: number,
  userEmail: string,
  message: string
): Promise<Feedback | null> {
  const { data, error } = await supabase
    .from(TABLES.FEEDBACK)
    .insert({
      id: uuidv4(),
      user_telegram_id: userTelegramId,
      user_email: userEmail,
      message,
      created_at: new Date().toISOString()
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating feedback:', error);
    return null;
  }
  
  return data;
}

export async function replyToFeedback(
  feedbackId: string,
  adminReply: string
): Promise<boolean> {
  const { error } = await supabase
    .from(TABLES.FEEDBACK)
    .update({
      admin_reply: adminReply,
      replied_at: new Date().toISOString()
    })
    .eq('id', feedbackId);
  
  if (error) {
    console.error('Error replying to feedback:', error);
    return false;
  }
  
  return true;
}

export async function getPendingFeedback(): Promise<Feedback[]> {
  const { data, error } = await supabase
    .from(TABLES.FEEDBACK)
    .select('*')
    .is('admin_reply', null)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching pending feedback:', error);
    return [];
  }
  
  return data || [];
}

export async function getFeedbackById(id: string): Promise<Feedback | null> {
  const { data, error } = await supabase
    .from(TABLES.FEEDBACK)
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching feedback:', error);
    return null;
  }
  
  return data;
}
