import TelegramBot from 'node-telegram-bot-api';
import { getUserByTelegramId } from '../services/userService';
import { getPremiumRequestsByUser } from '../services/premiumService';
import { t } from '../localization';
import { createMainMenuKeyboard } from '../utils/keyboards';

export async function handleMyPurchases(bot: TelegramBot, msg: TelegramBot.Message): Promise<void> {
  const chatId = msg.chat.id;
  const telegramId = msg.from!.id;
  
  try {
    const user = await getUserByTelegramId(telegramId);
    
    if (!user) {
      await bot.sendMessage(chatId, t('error_not_logged_in', 'uz'));
      return;
    }
    
    const purchases = await getPremiumRequestsByUser(telegramId);
    
    if (purchases.length === 0) {
      await bot.sendMessage(chatId, t('purchase_history_empty', user.language));
      return;
    }
    
    let message = t('purchase_history_title', user.language) + '\n\n';
    
    purchases.forEach((purchase, index) => {
      const planName = purchase.plan_type === '1month' ? '1 Month Plan' : '3 Month Plan';
      const status = purchase.status === 'approved' ? '✅ Approved' : 
                     purchase.status === 'rejected' ? '❌ Rejected' : 
                     '⏳ Pending';
      const date = new Date(purchase.created_at).toLocaleDateString();
      
      message += `${index + 1}. ` + t('purchase_item', user.language, {
        plan: planName,
        price: purchase.price.toString(),
        status,
        date
      }) + '\n\n';
    });
    
    await bot.sendMessage(chatId, message);
  } catch (error) {
    console.error('Error in handleMyPurchases:', error);
    await bot.sendMessage(chatId, t('error_occurred', 'uz'));
  }
}
