import { supabase, TABLES } from './supabaseClient';
import { PremiumRequest } from '../types';
import { v4 as uuidv4 } from 'uuid';

const PLAN_PRICES = {
  '1month': 34540,
  '3month': 97570
};

export async function createPremiumRequest(
  userTelegramId: number,
  userEmail: string,
  planType: '1month' | '3month',
  receiptFileId?: string
): Promise<PremiumRequest | null> {
  const { data, error } = await supabase
    .from(TABLES.PREMIUM)
    .insert({
      id: uuidv4(),
      user_telegram_id: userTelegramId,
      user_email: userEmail,
      plan_type: planType,
      price: PLAN_PRICES[planType],
      receipt_file_id: receiptFileId,
      status: 'pending',
      created_at: new Date().toISOString()
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating premium request:', error);
    return null;
  }
  
  return data;
}

export async function updatePremiumRequest(
  requestId: string,
  updates: Partial<PremiumRequest>
): Promise<boolean> {
  const { error } = await supabase
    .from(TABLES.PREMIUM)
    .update({
      ...updates,
      processed_at: new Date().toISOString()
    })
    .eq('id', requestId);
  
  if (error) {
    console.error('Error updating premium request:', error);
    return false;
  }
  
  return true;
}

export async function getPendingPremiumRequests(): Promise<PremiumRequest[]> {
  const { data, error } = await supabase
    .from(TABLES.PREMIUM)
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching pending premium requests:', error);
    return [];
  }
  
  return data || [];
}

export async function getPremiumRequestById(id: string): Promise<PremiumRequest | null> {
  const { data, error } = await supabase
    .from(TABLES.PREMIUM)
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching premium request:', error);
    return null;
  }
  
  return data;
}

export async function getPremiumRequestsByUser(telegramId: number): Promise<PremiumRequest[]> {
  const { data, error } = await supabase
    .from(TABLES.PREMIUM)
    .select('*')
    .eq('user_telegram_id', telegramId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching user premium requests:', error);
    return [];
  }
  
  return data || [];
}

export function getPlanPrice(planType: '1month' | '3month'): number {
  return PLAN_PRICES[planType];
}

export function getPlanName(planType: '1month' | '3month'): string {
  return planType === '1month' ? '1 Month Plan' : '3 Month Plan';
}

