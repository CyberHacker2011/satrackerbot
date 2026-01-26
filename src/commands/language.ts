import TelegramBot from 'node-telegram-bot-api';
import { getUserByTelegramId, updateUserLanguage } from '../services/userService';
import { t } from '../localization';
import { createLanguageKeyboard } from '../utils/keyboards';
import { Language } from '../types';

export async function handleLanguage(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const telegramId = msg.from!.id;
  
  try {
    const user = await getUserByTelegramId(telegramId);
    const lang = user?.language || 'uz';
    
    await bot.sendMessage(chatId, t('language_select', lang), {
      reply_markup: createLanguageKeyboard()
    });
  } catch (error) {
    console.error('Error in handleLanguage:', error);
    await bot.sendMessage(chatId, t('error_occurred', 'uz'));
  }
}

export async function handleLanguageChange(
  bot: TelegramBot,
  chatId: number,
  telegramId: number,
  newLanguage: Language
): Promise<void> {
  try {
    const success = await updateUserLanguage(telegramId, newLanguage);
    
    if (success) {
      await bot.sendMessage(chatId, t('language_changed', newLanguage));
    } else {
      await bot.sendMessage(chatId, t('error_occurred', newLanguage));
    }
  } catch (error) {
    console.error('Error in handleLanguageChange:', error);
    await bot.sendMessage(chatId, t('error_occurred', 'uz'));
  }
}
