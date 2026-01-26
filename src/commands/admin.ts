import TelegramBot from 'node-telegram-bot-api';
import { getUserByTelegramId, setUserAdmin } from '../services/userService';
import { updateSessionState } from '../services/sessionService';
import { t } from '../localization';
import { config } from '../config';
import { createAdminMainMenuKeyboard } from '../utils/keyboards';

const adminSessions = new Map<number, { awaitingPassword: boolean }>();

export async function handleAdminPath(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const telegramId = msg.from!.id;
  
  try {
    // Check if user is already admin
    const user = await getUserByTelegramId(telegramId);
    
    if (user?.is_admin) {
      await bot.sendMessage(chatId, t('admin_welcome', user.language), {
        reply_markup: createAdminMainMenuKeyboard()
      });
      return;
    }
    
    // Request password
    await bot.sendMessage(chatId, t('admin_password_prompt', 'uz'));
    adminSessions.set(telegramId, { awaitingPassword: true });
  } catch (error) {
    console.error('Error in handleAdminPath:', error);
    await bot.sendMessage(chatId, t('error_occurred', 'uz'));
  }
}

export async function handleAdminPasswordInput(
  bot: TelegramBot,
  msg: TelegramBot.Message,
  password: string
): Promise<boolean> {
  const chatId = msg.chat.id;
  const telegramId = msg.from!.id;
  
  const session = adminSessions.get(telegramId);
  if (!session?.awaitingPassword) {
    return false;
  }
  
  try {
    if (password === config.adminPassword) {
      // Grant admin access
      await setUserAdmin(telegramId, true);
      adminSessions.delete(telegramId);
      
      const user = await getUserByTelegramId(telegramId);
      await bot.sendMessage(chatId, t('admin_welcome', user?.language || 'uz'), {
        reply_markup: createAdminMainMenuKeyboard()
      });
      
      return true;
    } else {
      await bot.sendMessage(chatId, t('admin_password_wrong', 'uz'));
      adminSessions.delete(telegramId);
      return true;
    }
  } catch (error) {
    console.error('Error in handleAdminPasswordInput:', error);
    await bot.sendMessage(chatId, t('error_occurred', 'uz'));
    adminSessions.delete(telegramId);
    return true;
  }
}

export function isAwaitingAdminPassword(telegramId: number): boolean {
  return adminSessions.get(telegramId)?.awaitingPassword || false;
}

export async function isAdmin(telegramId: number): Promise<boolean> {
  const user = await getUserByTelegramId(telegramId);
  return user?.is_admin || false;
}
