import TelegramBot from 'node-telegram-bot-api';
import { config } from './config';
import { handleStart } from './commands/start';
import { handleFeedback } from './commands/feedback';
import { handlePremium } from './commands/premium';
import { handleLanguage } from './commands/language';
import { handleAdminPath, isAdmin } from './commands/admin';
import { handleLogout } from './commands/logout';
import { handleMyPurchases } from './commands/purchases';
import { handleMessage } from './handlers/messageHandler';
import { handleCallbackQuery } from './handlers/callbackHandler';
import { getUserByTelegramId } from './services/userService';
import { getStatistics, showAdminFeedbackList, showAdminPremiumList } from './services/adminService';
import { createMainMenuKeyboard } from './utils/keyboards';
import { updateSessionState } from './services/sessionService';
import { t } from './localization';

// Initialize bot
const bot = new TelegramBot(config.botToken, { polling: true });

console.log('🤖 Telegram Bot Started!');
console.log('Waiting for messages...\n');

// Command handlers
bot.onText(/\/start/, (msg) => handleStart(bot, msg));

// Secret admin path (not shown in command list)
bot.onText(/\/aytmayman/, (msg) => handleAdminPath(bot, msg));

// Message handler for button clicks and text messages
bot.on('message', async (msg) => {
  // Skip if it's a command
  if (msg.text && msg.text.startsWith('/')) {
    return;
  }
  
  const text = msg.text;
  const chatId = msg.chat.id;
  const telegramId = msg.from!.id;
  
  try {
    const user = await getUserByTelegramId(telegramId);
    const userIsAdmin = await isAdmin(telegramId);
    
    // Handle button presses
    if (text && user) {
      // User menu buttons
      if (text === t('cmd_feedback', user.language)) {
        await handleFeedback(bot, msg);
        return;
      }
      
      if (text === t('cmd_premium', user.language)) {
        await handlePremium(bot, msg);
        return;
      }
      
      if (text === t('cmd_language', user.language)) {
        await handleLanguage(bot, msg);
        return;
      }
      
      if (text === t('cmd_my_purchases', user.language)) {
        await handleMyPurchases(bot, msg);
        return;
      }
      
      if (text === t('cmd_logout', user.language)) {
        await handleLogout(bot, msg);
        return;
      }
    }
    
    // Admin menu buttons
    if (userIsAdmin && text) {
      if (text === '📊 Feedback List') {
        await showAdminFeedbackList(bot, chatId);
        return;
      }
      
      if (text === '💎 Premium Requests') {
        await showAdminPremiumList(bot, chatId);
        return;
      }
      
      if (text === '📢 Broadcast Message') {
        await bot.sendMessage(chatId, t('admin_broadcast_prompt', 'uz'));
        updateSessionState(telegramId, 'admin_messaging_user', { broadcast: true });
        return;
      }
      
      if (text === '📈 Statistics') {
        const stats = await getStatistics();
        await bot.sendMessage(chatId, t('admin_stats', 'uz', {
          users: stats.users.toString(),
          feedback: stats.feedback.toString(),
          premium: stats.premium.toString(),
          approved: stats.approved.toString()
        }));
        return;
      }
      
      if (text === '👤 Back to User Mode') {
        if (user) {
          await bot.sendMessage(
            chatId,
            'Switched to user mode',
            { reply_markup: createMainMenuKeyboard(user.language) }
          );
        }
        return;
      }
    }
  } catch (error) {
    console.error('Error in message handler:', error);
  }
  
  // Handle regular text messages (email, feedback, passwords, etc.)
  await handleMessage(bot, msg);
});

// Callback query handler
bot.on('callback_query', (query) => {
  handleCallbackQuery(bot, query);
});

// Error handling
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down bot...');
  bot.stopPolling();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Shutting down bot...');
  bot.stopPolling();
  process.exit(0);
});

