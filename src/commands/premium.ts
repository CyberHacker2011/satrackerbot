import TelegramBot from 'node-telegram-bot-api';
import { getUserByTelegramId } from '../services/userService';
import { t } from '../localization';
import { createPremiumKeyboard } from '../utils/keyboards';

export async function handlePremium(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const telegramId = msg.from!.id;
  
  try {
    const user = await getUserByTelegramId(telegramId);
    
    if (!user) {
      await bot.sendMessage(chatId, t('error_not_logged_in', 'uz'));
      return;
    }
    
    const message = `${t('premium_title', user.language)}\n\n` +
      `${t('premium_monthly', user.language)}\n\n` +
      `━━━━━━━━━━━━━━━━\n\n` +
      `${t('premium_quarterly', user.language)}`;
    
    await bot.sendMessage(chatId, message, {
      reply_markup: createPremiumKeyboard(user.language)
    });
  } catch (error) {
    console.error('Error in handlePremium:', error);
    await bot.sendMessage(chatId, t('error_occurred', 'uz'));
  }
}
