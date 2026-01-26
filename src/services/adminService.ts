import TelegramBot from 'node-telegram-bot-api';
import { config } from '../config';
import { supabase, TABLES } from './supabaseClient';
import { getPendingFeedback } from './feedbackService';
import { getPendingPremiumRequests } from './premiumService';
import { Feedback, PremiumRequest } from '../types';
import { t } from '../localization';

// Track feedback replies
const feedbackReplyMap = new Map<number, string>(); // messageId -> feedbackId

export function setFeedbackReplyContext(messageId: number, feedbackId: string): void {
  feedbackReplyMap.set(messageId, feedbackId);
}

export function getFeedbackIdByMessageId(messageId: number): string | undefined {
  return feedbackReplyMap.get(messageId);
}

export async function handleAdminBroadcast(
  bot: TelegramBot,
  message: string
): Promise<number> {
  try {
    const { data: users, error } = await supabase
      .from(TABLES.USERS)
      .select('telegram_id, language');
    
    if (error || !users) {
      console.error('Error fetching users for broadcast:', error);
      return 0;
    }
    
    let sentCount = 0;
    for (const user of users) {
      try {
        await bot.sendMessage(user.telegram_id, message);
        sentCount++;
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 50));
      } catch (err) {
        console.error(`Failed to send to ${user.telegram_id}:`, err);
      }
    }
    
    return sentCount;
  } catch (error) {
    console.error('Error in handleAdminBroadcast:', error);
    return 0;
  }
}

export async function getStatistics(): Promise<{
  users: number;
  feedback: number;
  premium: number;
  approved: number;
}> {
  try {
    const [usersResult, feedbackResult, premiumResult, approvedResult] = await Promise.all([
      supabase.from(TABLES.USERS).select('telegram_id', { count: 'exact', head: true }),
      supabase.from(TABLES.FEEDBACK).select('id', { count: 'exact', head: true }),
      supabase.from(TABLES.PREMIUM).select('id', { count: 'exact', head: true }),
      supabase.from(TABLES.PREMIUM).select('id', { count: 'exact', head: true }).eq('status', 'approved')
    ]);
    
    return {
      users: usersResult.count || 0,
      feedback: feedbackResult.count || 0,
      premium: premiumResult.count || 0,
      approved: approvedResult.count || 0
    };
  } catch (error) {
    console.error('Error getting statistics:', error);
    return { users: 0, feedback: 0, premium: 0, approved: 0 };
  }
}

export async function showAdminFeedbackList(bot: TelegramBot, chatId: number): Promise<void> {
  const feedbackList = await getPendingFeedback();
  
  if (feedbackList.length === 0) {
    await bot.sendMessage(chatId, t('admin_no_feedback', 'uz'));
    return;
  }
  
  await bot.sendMessage(chatId, t('admin_feedback_list', 'uz') + `\n\nTotal: ${feedbackList.length} pending`);
  
  // Send each feedback as a separate message with action button
  for (const feedback of feedbackList) {
    const message = `📩 Feedback from: ${feedback.user_email}\n` +
                   `Date: ${new Date(feedback.created_at).toLocaleString()}\n\n` +
                   `Message:\n${feedback.message}\n\n` +
                   `ID: ${feedback.id}`;
    
    await bot.sendMessage(chatId, message, {
      reply_markup: {
        inline_keyboard: [
          [{ text: '💬 Reply to User', callback_data: `admin_reply_feedback_${feedback.id}` }]
        ]
      }
    });
    
    // Small delay to avoid flooding
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

export async function showAdminPremiumList(bot: TelegramBot, chatId: number): Promise<void> {
  const premiumList = await getPendingPremiumRequests();
  
  if (premiumList.length === 0) {
    await bot.sendMessage(chatId, t('admin_no_premium', 'uz'));
    return;
  }
  
  await bot.sendMessage(chatId, t('admin_premium_list', 'uz') + `\n\nTotal: ${premiumList.length} pending`);
  
  // Send each premium request as a separate message with action buttons
  for (const request of premiumList) {
    const planName = request.plan_type === '1month' ? '1 Month Plan' : '3 Month Plan';
    const message = `💎 Premium Request\n\n` +
                   `From: ${request.user_email}\n` +
                   `Plan: ${planName}\n` +
                   `Price: ${request.price} UZS\n` +
                   `Date: ${new Date(request.created_at).toLocaleString()}\n\n` +
                   `ID: ${request.id}`;
    
    await bot.sendMessage(chatId, message, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '✅ Approve', callback_data: `admin_approve_${request.id}` },
            { text: '❌ Reject', callback_data: `admin_reject_${request.id}` }
          ],
          [{ text: '💬 Message User', callback_data: `admin_message_${request.id}` }]
        ]
      }
    });
    
    // Small delay to avoid flooding
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}
