import TelegramBot from 'node-telegram-bot-api';
import { getUserByTelegramId } from '../services/userService';
import { handleLanguageChange } from '../commands/language';
import { handlePremiumSelection } from '../services/paymentService';
import { handleAdminApprove, handleAdminReject } from '../services/paymentService';
import { updateSessionState } from '../services/sessionService';
import { Language } from '../types';
import { t } from '../localization';
import { createMainMenuKeyboard } from '../utils/keyboards';

export async function handleCallbackQuery(
  bot: TelegramBot,
  query: TelegramBot.CallbackQuery
): Promise<void> {
  const chatId = query.message!.chat.id;
  const telegramId = query.from.id;
  const data = query.data!;
  
  try {
    const user = await getUserByTelegramId(telegramId);
    
    // Language selection
    if (data.startsWith('lang_')) {
      const lang = data.replace('lang_', '') as Language;
      await handleLanguageChange(bot, chatId, telegramId, lang);
      await bot.answerCallbackQuery(query.id);
      return;
    }
    
    // Premium plan selection
    if (data.startsWith('premium_')) {
      const planType = data.replace('premium_', '') as '1month' | '3month';
      await handlePremiumSelection(bot, chatId, telegramId, planType);
      await bot.answerCallbackQuery(query.id);
      return;
    }
    
    // Admin: Reply to feedback
    if (data.startsWith('admin_reply_feedback_')) {
      const feedbackId = data.replace('admin_reply_feedback_', '');
      await bot.sendMessage(chatId, 'Reply to the feedback message above to send your response to the user.');
      updateSessionState(telegramId, 'admin_replying_feedback', { feedbackId });
      await bot.answerCallbackQuery(query.id, { text: 'Reply to send message' });
      return;
    }
    
    // Admin actions for premium
    if (data.startsWith('admin_approve_')) {
      const requestId = data.replace('admin_approve_', '');
      await handleAdminApprove(bot, chatId, requestId);
      await bot.answerCallbackQuery(query.id, { text: 'Approved!' });
      return;
    }
    
    if (data.startsWith('admin_reject_')) {
      const requestId = data.replace('admin_reject_', '');
      await handleAdminReject(bot, chatId, requestId);
      await bot.answerCallbackQuery(query.id, { text: 'Rejected!' });
      return;
    }
    
    if (data.startsWith('admin_message_')) {
      const requestId = data.replace('admin_message_', '');
      updateSessionState(telegramId, 'admin_messaging_user', { premiumRequestId: requestId });
      await bot.answerCallbackQuery(query.id, { 
        text: 'Type your message to send to the user' 
      });
      return;
    }
    
    // Back to menu
    if (data === 'back_to_menu') {
      if (user) {
        await bot.sendMessage(
          chatId,
          t('welcome_back', user.language, { email: user.email }),
          { reply_markup: createMainMenuKeyboard(user.language) }
        );
      }
      await bot.answerCallbackQuery(query.id);
      return;
    }
    
    if (data === 'cancel') {
      await bot.answerCallbackQuery(query.id, { text: 'Cancelled' });
      return;
    }
    
    await bot.answerCallbackQuery(query.id);
  } catch (error) {
    console.error('Error handling callback query:', error);
    await bot.answerCallbackQuery(query.id, { text: 'Error occurred' });
  }
}
