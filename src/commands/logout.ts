import TelegramBot from 'node-telegram-bot-api';
import { supabase, TABLES } from '../services/supabaseClient';
import { clearSession } from '../services/sessionService';
import { t } from '../localization';
import { getUserByTelegramId } from '../services/userService';

export async function handleLogout(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const telegramId = msg.from!.id;
  
  try {
    const user = await getUserByTelegramId(telegramId);
    
    if (!user) {
      await bot.sendMessage(chatId, t('error_not_logged_in', 'uz'));
      return;
    }
    
    // Clear session
    clearSession(telegramId);
    
    // Delete the telegram user record completely so they need to re-authenticate
    await supabase
      .from(TABLES.USERS)
      .delete()
      .eq('telegram_id', telegramId);
    
    // Sign out from Supabase auth
    await supabase.auth.signOut();
    
    await bot.sendMessage(
      chatId, 
      t('logout_success', user.language),
      { reply_markup: { remove_keyboard: true } }
    );
  } catch (error) {
    console.error('Error in handleLogout:', error);
    await bot.sendMessage(chatId, t('error_occurred', 'uz'));
  }
}
