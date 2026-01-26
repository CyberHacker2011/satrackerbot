import TelegramBot from 'node-telegram-bot-api';
import { getUserByTelegramId, authenticateUser } from '../services/userService';
import { updateSessionState } from '../services/sessionService';
import { t } from '../localization';
import { isValidEmail } from '../utils/validators';
import { createMainMenuKeyboard } from '../utils/keyboards';

export async function handleStart(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const telegramId = msg.from!.id;
  
  try {
    const user = await getUserByTelegramId(telegramId);
    
    if (user) {
      // User already exists - show menu
      await bot.sendMessage(
        chatId,
        t('welcome_back', user.language, { email: user.email }),
        { reply_markup: createMainMenuKeyboard(user.language) }
      );
    } else {
      // New user - request email
      await bot.sendMessage(chatId, t('welcome', 'uz'), {
        reply_markup: { remove_keyboard: true }
      });
      updateSessionState(telegramId, 'awaiting_email');
    }
  } catch (error) {
    console.error('Error in handleStart:', error);
    await bot.sendMessage(chatId, t('error_occurred', 'uz'));
  }
}

export async function handleEmailInput(
  bot: TelegramBot,
  msg: TelegramBot.Message,
  email: string
): Promise<void> {
  const chatId = msg.chat.id;
  const telegramId = msg.from!.id;
  
  if (!isValidEmail(email)) {
    await bot.sendMessage(chatId, t('email_invalid', 'uz'));
    return;
  }
  
  try {
    // Store email in session and request password
    await bot.sendMessage(chatId, t('password_prompt', 'uz'));
    updateSessionState(telegramId, 'awaiting_password', { email });
  } catch (error) {
    console.error('Error in handleEmailInput:', error);
    await bot.sendMessage(chatId, t('error_occurred', 'uz'));
  }
}

export async function handlePasswordInput(
  bot: TelegramBot,
  msg: TelegramBot.Message,
  password: string,
  email: string
): Promise<void> {
  const chatId = msg.chat.id;
  const telegramId = msg.from!.id;
  
  try {
    const result = await authenticateUser(telegramId, email, password);
    
    if (result.success && result.user) {
      await bot.sendMessage(
        chatId,
        t('login_success', result.user.language),
        { reply_markup: createMainMenuKeyboard(result.user.language) }
      );
      updateSessionState(telegramId, 'idle');
    } else {
      await bot.sendMessage(chatId, t('auth_failed', 'uz') + '\n' + (result.message || ''));
      // Reset to email input
      updateSessionState(telegramId, 'awaiting_email');
    }
  } catch (error) {
    console.error('Error in handlePasswordInput:', error);
    await bot.sendMessage(chatId, t('error_occurred', 'uz'));
  }
}

