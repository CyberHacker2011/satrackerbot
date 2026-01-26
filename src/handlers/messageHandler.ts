import TelegramBot from 'node-telegram-bot-api';
import { getSession } from '../services/sessionService';
import { handleEmailInput, handlePasswordInput } from '../commands/start';
import { handleFeedbackInput } from '../commands/feedback';
import { handleReceiptUpload } from '../services/paymentService';
import { handleAdminPasswordInput, isAwaitingAdminPassword } from '../commands/admin';
import { handleAdminBroadcast } from '../services/adminService';
import { getFeedbackById, replyToFeedback } from '../services/feedbackService';
import { getUserByTelegramId } from '../services/userService';
import { t } from '../localization';

export async function handleMessage(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const telegramId = msg.from!.id;
  const text = msg.text;
  
  if (!text) {
    // Handle non-text messages
    await handleNonTextMessage(bot, msg);
    return;
  }
  
  try {
    // Check if awaiting admin password (priority check)
    if (isAwaitingAdminPassword(telegramId)) {
      const handled = await handleAdminPasswordInput(bot, msg, text);
      if (handled) return;
    }
    
    // Check user session state
    const session = getSession(telegramId);
    
    if (session) {
      switch (session.state) {
        case 'awaiting_email':
          await handleEmailInput(bot, msg, text);
          break;
        
        case 'awaiting_password':
          if (session.context?.email) {
            await handlePasswordInput(bot, msg, text, session.context.email);
          }
          break;
        
        case 'awaiting_feedback':
          await handleFeedbackInput(bot, msg, text);
          break;
        
        case 'admin_replying_feedback':
          if (session.context?.feedbackId) {
            await handleAdminFeedbackReply(bot, msg, text, session.context.feedbackId);
          }
          break;
        
        case 'admin_messaging_user':
          if (session.context?.broadcast) {
            const count = await handleAdminBroadcast(bot, text);
            await bot.sendMessage(chatId, t('admin_broadcast_sent', 'uz', { count: count.toString() }));
          }
          break;
        
        default:
          // Idle or unknown state - ignore
          break;
      }
    }
  } catch (error) {
    console.error('Error handling message:', error);
  }
}

async function handleAdminFeedbackReply(
  bot: TelegramBot,
  msg: TelegramBot.Message,
  replyText: string,
  feedbackId: string
): Promise<void> {
  try {
    const feedback = await getFeedbackById(feedbackId);
    if (!feedback) return;
    
    // Store reply in database
    await replyToFeedback(feedbackId, replyText);
    
    // Send to user
    const user = await getUserByTelegramId(feedback.user_telegram_id);
    if (user) {
      await bot.sendMessage(
        feedback.user_telegram_id,
        t('admin_reply', user.language, { reply: replyText })
      );
    }
    
    await bot.sendMessage(msg.chat.id, t('feedback_reply_sent', 'uz'));
  } catch (error) {
    console.error('Error in admin feedback reply:', error);
  }
}

async function handleNonTextMessage(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const telegramId = msg.from!.id;
  const session = getSession(telegramId);
  
  if (!session) return;
  
  try {
    // Handle receipt upload
    if (session.state === 'awaiting_receipt') {
      let fileId: string | undefined;
      
      if (msg.photo && msg.photo.length > 0) {
        // Get highest resolution photo
        fileId = msg.photo[msg.photo.length - 1].file_id;
      } else if (msg.document) {
        fileId = msg.document.file_id;
      }
      
      if (fileId && session.context?.planType) {
        await handleReceiptUpload(bot, msg, fileId, session.context.planType);
      }
    }
  } catch (error) {
    console.error('Error handling non-text message:', error);
  }
}
