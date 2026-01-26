import TelegramBot from 'node-telegram-bot-api';
import { getUserByTelegramId } from '../services/userService';
import { createFeedback } from '../services/feedbackService';
import { updateSessionState, getSession } from '../services/sessionService';
import { setFeedbackReplyContext } from '../services/adminService';
import { t } from '../localization';
import { config } from '../config';
import { createAdminFeedbackKeyboard } from '../utils/keyboards';

export async function handleFeedback(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const telegramId = msg.from!.id;
  
  try {
    const user = await getUserByTelegramId(telegramId);
    
    if (!user) {
      await bot.sendMessage(chatId, t('error_not_logged_in', 'uz'));
      return;
    }
    
    await bot.sendMessage(chatId, t('feedback_prompt', user.language));
    updateSessionState(telegramId, 'awaiting_feedback');
  } catch (error) {
    console.error('Error in handleFeedback:', error);
    await bot.sendMessage(chatId, t('error_occurred', 'uz'));
  }
}

export async function handleFeedbackInput(
  bot: TelegramBot,
  msg: TelegramBot.Message,
  feedbackText: string
): Promise<void> {
  const chatId = msg.chat.id;
  const telegramId = msg.from!.id;
  
  try {
    const user = await getUserByTelegramId(telegramId);
    
    if (!user) {
      await bot.sendMessage(chatId, t('error_not_logged_in', 'uz'));
      return;
    }
    
    const feedback = await createFeedback(telegramId, user.email, feedbackText);
    
    if (feedback) {
      // Notify user
      await bot.sendMessage(chatId, t('feedback_sent', user.language));
      
      // Notify admin with inline button
      const adminMessage = t('feedback_received', 'uz', {
        email: user.email,
        message: feedbackText
      });
      
      const sentMsg = await bot.sendMessage(config.adminChatId, adminMessage, {
        reply_markup: createAdminFeedbackKeyboard(feedback.id)
      });
      
      // Track this message for reply functionality
      setFeedbackReplyContext(sentMsg.message_id, feedback.id);
      
      updateSessionState(telegramId, 'idle');
    } else {
      await bot.sendMessage(chatId, t('error_occurred', user.language));
    }
  } catch (error) {
    console.error('Error in handleFeedbackInput:', error);
    await bot.sendMessage(chatId, t('error_occurred', 'uz'));
  }
}

