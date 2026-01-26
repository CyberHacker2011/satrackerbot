import TelegramBot from 'node-telegram-bot-api';
import { Language } from '../types';
import { t } from '../localization';

export function createMainMenuKeyboard(lang: Language): TelegramBot.ReplyKeyboardMarkup {
  return {
    keyboard: [
      [
        { text: t('cmd_feedback', lang) },
        { text: t('cmd_premium', lang) }
      ],
      [
        { text: t('cmd_my_purchases', lang) },
        { text: t('cmd_language', lang) }
      ],
      [
        { text: t('cmd_logout', lang) }
      ]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  };
}

export function createAdminMainMenuKeyboard(): TelegramBot.ReplyKeyboardMarkup {
  return {
    keyboard: [
      [
        { text: '📊 Feedback List' },
        { text: '💎 Premium Requests' }
      ],
      [
        { text: '📢 Broadcast Message' },
        { text: '📈 Statistics' }
      ],
      [
        { text: '👤 Back to User Mode' }
      ]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  };
}

export function createPremiumKeyboard(lang: Language): TelegramBot.InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: t('btn_1month', lang), callback_data: 'premium_1month' }],
      [{ text: t('btn_3month', lang), callback_data: 'premium_3month' }]
    ]
  };
}

export function createLanguageKeyboard(): TelegramBot.InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: '🇺🇿 O\'zbekcha', callback_data: 'lang_uz' }],
      [{ text: '🇷🇺 Русский', callback_data: 'lang_ru' }],
      [{ text: '🇬🇧 English', callback_data: 'lang_en' }]
    ]
  };
}

export function createAdminPremiumKeyboard(requestId: string): TelegramBot.InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: '✅ Approve', callback_data: `admin_approve_${requestId}` },
        { text: '❌ Reject', callback_data: `admin_reject_${requestId}` }
      ],
      [{ text: '💬 Message User', callback_data: `admin_message_${requestId}` }]
    ]
  };
}

export function createAdminFeedbackKeyboard(feedbackId: string): TelegramBot.InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: '💬 Reply', callback_data: `admin_reply_feedback_${feedbackId}` }]
    ]
  };
}

export function createConfirmKeyboard(action: string, id: string): TelegramBot.InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: '✅ Yes', callback_data: `confirm_${action}_${id}` },
        { text: '❌ Cancel', callback_data: 'cancel' }
      ]
    ]
  };
}

export function createBackToMenuKeyboard(lang: Language): TelegramBot.InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: t('btn_back_to_menu', lang), callback_data: 'back_to_menu' }]
    ]
  };
}
