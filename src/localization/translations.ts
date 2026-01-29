import { Language } from "../types";

export const translations: Record<Language, Record<string, string>> = {
  uz: {
    // Welcome & Auth
    welcome:
      "👋 Assalomu alaykum! Xush kelibsiz.\n\nTizimga kirish uchun elektron pochtangizni kiriting:",
    welcome_back:
      "👋 Xayrli kun! Sizni yana ko'rganimizdan xursandmiz, {{email}}.",
    email_invalid: "❌ Iltimos, to'g'ri elektron pochta manzilini kiriting.",
    password_prompt: "🔑 Endi parolingizni kiriting:",
    auth_failed:
      "❌ Email yoki parol noto'g'ri. Iltimos, qaytadan urinib ko'ring.",
    email_registered:
      "✅ Email muvaffaqiyatli ro'yxatdan o'tkazildi! {{email}}",
    login_success: "✅ Tizimga muvaffaqiyatli kirdingiz!",

    // Commands
    cmd_feedback: "📝 Fikr-mulohaza yuborish",
    cmd_premium: "⭐ Premium obuna",
    cmd_language: "🌐 Tilni o'zgartirish",
    cmd_my_purchases: "📦 Mening xaridlarim",
    cmd_logout: "🚪 Chiqish",
    btn_back_to_menu: "🔙 Asosiy menyuga qaytish",

    // Feedback
    feedback_prompt:
      "Fikr-mulohazangizni yozing. Admin bilan anonim tarzda bog'lanamiz:",
    feedback_sent:
      "Fikr-mulohazangiz muvaffaqiyatli yuborildi! Admin tez orada javob beradi.",
    feedback_received:
      "📩 Yangi fikr-mulohaza:\n\nFoydalanuvchi: {{email}}\nXabar: {{message}}\n\nJavob berish uchun to'g'ridan-to'g'ri javob yozing.",
    feedback_reply_sent: "Javobingiz foydalanuvchiga yuborildi.",
    admin_reply: "📬 Admindan javob:\n\n{{reply}}",

    // Premium
    premium_title: "⭐ Premium Obuna Rejalari",
    premium_monthly:
      "📅 Oylik Reja\n💰 34 000 so'm / oyiga\n\n✅ Cheksiz O'quv Rejalari\n✅ Kengaytirilgan Tahlillar",
    premium_quarterly:
      "🎯 Choraklik Reja\n💰 87 000 so'm / 3 oy uchun\n\n✅ Oylik rejadagi barcha narsalar\n✅ Kelajakdagi yangiliklar uchun narxni saqlab qolish\n🏆 Eng Yaxshi Taklif",
    btn_1month: "1 oy - 34 000 so'm",
    btn_3month: "3 oy - 87 000 so'm",

    // Payment
    payment_card:
      "💳 *To'lov ma'lumotlari*:\n\nKarta raqami (nusxa olish uchun bosing):\n`{{cardNumber}}`\n\nKarta egasi: *{{cardHolder}}*\n\nIltimos, to'lovni amalga oshiring va so'ngra to'lov chekini (rasm yoki fayl ko'rinishida) yuboring.",
    receipt_prompt: "📸 Iltimos, to'lov chekini yuboring:",
    payment_submitted:
      "✅ So'rovingiz qabul qilindi!\n\nAdminlar 24 soat ichida siz bilan bog'lanadi.\n\nBizdan foydalanganingiz uchun rahmat! 🙏",
    premium_request:
      "💎 Yangi Premium so'rov\n\nFoydalanuvchi: {{email}}\nReja: {{plan}}\nNarx: {{price}} so'm\n\nTasdiqlash yoki rad etish uchun tugmalardan foydalaning.",
    premium_approved:
      "🎉 Tabriklaymiz!\n\nPremium obunangiz tasdiqlandi. Barcha premium funksiyalardan foydalanishingiz mumkin!",
    premium_rejected:
      "❌ Kechirasiz, premium so'rovingiz rad etildi.\n\nSabab: {{reason}}\n\nYanada ko'proq ma'lumot uchun adminga murojaat qilishingiz mumkin.",
    btn_approve: "✅ Tasdiqlash",
    btn_reject: "❌ Rad etish",
    btn_message_user: "💬 Xabar yuborish",

    // Language
    language_select: "Tilni tanlang:",
    language_changed: "Til muvaffaqiyatli o'zgartirildi!",
    btn_uzbek: "🇺🇿 O'zbekcha",
    btn_russian: "🇷🇺 Русский",
    btn_english: "🇬🇧 English",

    // Admin
    admin_welcome: "👨‍💼 Admin Panel\n\nXush kelibsiz!",
    admin_password_prompt: "Parolni kiriting:",
    admin_password_wrong: "Noto'g'ri parol.",
    admin_unauthorized: "Sizda ruxsat yo'q.",
    admin_broadcast_prompt:
      "Barcha foydalanuvchilarga yuboriladigan xabarni yozing:",
    admin_broadcast_sent: "Xabar {{count}} ta foydalanuvchiga yuborildi.",
    admin_stats:
      "📊 Statistika\n\n👥 Foydalanuvchilar: {{users}}\n📝 Fikr-mulohazalar: {{feedback}}\n💎 Premium so'rovlar: {{premium}}\n✅ Tasdiqlangan: {{approved}}",
    admin_feedback_list: "📊 Fikr-mulohazalar ro'yxati",
    admin_premium_list: "💎 Premium so'rovlar ro'yxati",
    admin_no_feedback: "Hech qanday javobsiz fikr-mulohaza yo'q.",
    admin_no_premium: "Hech qanday kutilayotgan premium so'rov yo'q.",

    // Purchase History
    purchase_history_title: "📦 Sizning xaridlaringiz",
    purchase_history_empty: "Siz hali hech narsa sotib olmadingiz.",
    purchase_item:
      "{{plan}} - {{price}} so'm\nHolat: {{status}}\nSana: {{date}}",

    // Logout
    logout_confirm: "Haqiqatan ham chiqmoqchimisiz?",
    logout_success:
      "Siz muvaffaqiyatli chiqdingiz. Qayta kirishuchun /start bosing.",

    // Errors
    error_occurred: "Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
    error_not_logged_in: "Iltimos, avval /start buyrug'i bilan tizimga kiring.",
  },

  ru: {
    // Welcome & Auth
    welcome:
      "👋 Здравствуйте! Добро пожаловать.\n\nВведите свой email для входа в систему:",
    welcome_back: "👋 Добрый день! Рады видеть вас снова, {{email}}.",
    email_invalid: "❌ Пожалуйста, введите корректный email адрес.",
    password_prompt: "🔑 Теперь введите ваш пароль:",
    auth_failed: "❌ Неверный email или пароль. Пожалуйста, попробуйте снова.",
    email_registered: "✅ Email успешно зарегистрирован! {{email}}",
    login_success: "✅ Вы успешно вошли в систему!",

    // Commands
    cmd_feedback: "📝 Отправить отзыв",
    cmd_premium: "⭐ Premium подписка",
    cmd_language: "🌐 Изменить язык",
    cmd_my_purchases: "📦 Мои покупки",
    cmd_logout: "🚪 Выйти",
    btn_back_to_menu: "🔙 Вернуться в меню",

    // Feedback
    feedback_prompt:
      "Напишите ваш отзыв. Мы свяжемся с администратором анонимно:",
    feedback_sent: "Ваш отзыв успешно отправлен! Администратор скоро ответит.",
    feedback_received:
      "📩 Новый отзыв:\n\nПользователь: {{email}}\nСообщение: {{message}}\n\nОтветьте на это сообщение для ответа.",
    feedback_reply_sent: "Ваш ответ отправлен пользователю.",
    admin_reply: "📬 Ответ от администратора:\n\n{{reply}}",

    // Premium
    premium_title: "⭐ Premium Подписки",
    premium_monthly:
      "📅 Месячный план\n💰 34 000 сум / месяц\n\n✅ Безлимитные учебные планы\n✅ Расширенная аналитика",
    premium_quarterly:
      "🎯 Quarterly План\n💰 87 000 сум / 3 месяца\n\n✅ Все из месячного плана\n✅ Сохранение цены на будущие обновления\n🏆 Лучшее предложение",
    btn_1month: "1 месяц - 34 000 сум",
    btn_3month: "3 месяца - 87 000 сум",

    // Payment
    payment_card:
      "💳 *Платежная информация*:\n\nНомер карты (нажмите для копирования):\n`{{cardNumber}}`\n\nВладелец карты: *{{cardHolder}}*\n\nПожалуйста, совершите платеж и затем отправьте чек (фото или файл).",
    receipt_prompt: "📸 Пожалуйста, отправьте фото или файл чека:",
    payment_submitted:
      "✅ Ваш запрос принят!\n\nАдминистраторы свяжутся с вами в течение 24 часов.\n\nСпасибо за использование нашего сервиса! 🙏",
    premium_request:
      "💎 Новый Premium запрос\n\nПользователь: {{email}}\nПлан: {{plan}}\nЦена: {{price}} сум\n\nИспользуйте кнопки для подтверждения или отклонения.",
    premium_approved:
      "🎉 Поздравляем!\n\nВаша Premium подписка подтверждена. Теперь вы можете использовать все premium функции!",
    premium_rejected:
      "❌ К сожалению, ваш premium запрос отклонен.\n\nПричина: {{reason}}\n\nВы можете связаться с администратором для получения дополнительной информации.",
    btn_approve: "✅ Подтвердить",
    btn_reject: "❌ Отклонить",
    btn_message_user: "💬 Отправить сообщение",

    // Language
    language_select: "Выберите язык:",
    language_changed: "Язык успешно изменен!",
    btn_uzbek: "🇺🇿 O'zbekcha",
    btn_russian: "🇷🇺 Русский",
    btn_english: "🇬🇧 English",

    // Admin
    admin_welcome: "👨‍💼 Панель администратора\n\nДобро пожаловать!",
    admin_password_prompt: "Введите пароль:",
    admin_password_wrong: "Неверный пароль.",
    admin_unauthorized: "У вас нет доступа.",
    admin_broadcast_prompt:
      "Напишите сообщение для отправки всем пользователям:",
    admin_broadcast_sent: "Сообщение отправлено {{count}} пользователям.",
    admin_stats:
      "📊 Статистика\n\n👥 Пользователи: {{users}}\n📝 Отзывы: {{feedback}}\n💎 Premium запросы: {{premium}}\n✅ Одобрено: {{approved}}",
    admin_feedback_list: "📊 Список отзывов",
    admin_premium_list: "💎 Список Premium запросов",
    admin_no_feedback: "Нет неотвеченных отзывов.",
    admin_no_premium: "Нет ожидающих Premium запросов.",

    // Purchase History
    purchase_history_title: "📦 Ваши покупки",
    purchase_history_empty: "Вы еще ничего не купили.",
    purchase_item:
      "{{plan}} - {{price}} сум\nСтатус: {{status}}\nДата: {{date}}",

    // Logout
    logout_confirm: "Вы действительно хотите выйти?",
    logout_success: "Вы успешно вышли. Для повторного входа нажмите /start.",

    // Errors
    error_occurred: "Произошла ошибка. Пожалуйста, попробуйте снова.",
    error_not_logged_in:
      "Пожалуйста, сначала войдите с помощью команды /start.",
  },

  en: {
    // Welcome & Auth
    welcome:
      "👋 Hello! Welcome to the bot.\n\nPlease enter your email to log in:",
    welcome_back: "👋 Welcome back, {{email}}!",
    email_invalid: "❌ Please enter a valid email address.",
    password_prompt: "🔑 Now enter your password:",
    auth_failed: "❌ Invalid email or password. Please try again.",
    email_registered: "✅ Email successfully registered! {{email}}",
    login_success: "✅ You have successfully logged in!",

    // Commands
    cmd_feedback: "📝 Send Feedback",
    cmd_premium: "⭐ Premium Subscription",
    cmd_language: "🌐 Change Language",
    cmd_my_purchases: "📦 My Purchases",
    cmd_logout: "🚪 Logout",
    btn_back_to_menu: "🔙 Back to Menu",

    // Feedback
    feedback_prompt:
      "Write your feedback. We will connect with admin anonymously:",
    feedback_sent:
      "Your feedback has been sent successfully! Admin will reply soon.",
    feedback_received:
      "📩 New Feedback:\n\nUser: {{email}}\nMessage: {{message}}\n\nReply directly to respond.",
    feedback_reply_sent: "Your reply has been sent to the user.",
    admin_reply: "📬 Reply from Admin:\n\n{{reply}}",

    // Premium
    premium_title: "⭐ Premium Subscription Plans",
    premium_monthly:
      "📅 Monthly Plan\n💰 34 000 UZS / month\n\n✅ Unlimited Study Plans\n✅ Advanced Analytics",
    premium_quarterly:
      "🎯 Quarterly Plan\n💰 87 000 UZS / 3 months\n\n✅ Everything in Monthly Plan\n✅ Price lock for future updates\n🏆 Best Offer",
    btn_1month: "1 month - 34 000 UZS",
    btn_3month: "3 months - 87 000 UZS",

    // Payment
    payment_card:
      "💳 *Payment Information*:\n\nCard Number (tap to copy):\n`{{cardNumber}}`\n\nCard Holder: *{{cardHolder}}*\n\nPlease make the payment and then upload the receipt image or file.",
    receipt_prompt: "📸 Please send the receipt image or file:",
    payment_submitted:
      "✅ Your request has been received!\n\nAdmins will connect with you within 24 hours.\n\nThank you for using our service! 🙏",
    premium_request:
      "💎 New Premium Request\n\nUser: {{email}}\nPlan: {{plan}}\nPrice: {{price}} UZS\n\nUse buttons to approve or reject.",
    premium_approved:
      "🎉 Congratulations!\n\nYour Premium subscription has been approved. You can now use all premium features!",
    premium_rejected:
      "❌ Sorry, your premium request has been rejected.\n\nReason: {{reason}}\n\nYou can contact admin for more information.",
    btn_approve: "✅ Approve",
    btn_reject: "❌ Reject",
    btn_message_user: "💬 Send Message",

    // Language
    language_select: "Select language:",
    language_changed: "Language changed successfully!",
    btn_uzbek: "🇺🇿 O'zbekcha",
    btn_russian: "🇷🇺 Русский",
    btn_english: "🇬🇧 English",

    // Admin
    admin_welcome: "👨‍💼 Admin Panel\n\nWelcome!",
    admin_password_prompt: "Enter password:",
    admin_password_wrong: "Wrong password.",
    admin_unauthorized: "You don't have access.",
    admin_broadcast_prompt: "Write the message to send to all users:",
    admin_broadcast_sent: "Message sent to {{count}} users.",
    admin_stats:
      "📈 Statistics\n\n👥 Users: {{users}}\n📝 Feedback: {{feedback}}\n💎 Premium requests: {{premium}}\n✅ Approved: {{approved}}",
    admin_feedback_list: "📊 Feedback List",
    admin_premium_list: "💎 Premium Requests List",
    admin_no_feedback: "No unanswered feedback.",
    admin_no_premium: "No pending premium requests.",

    // Purchase History
    purchase_history_title: "📦 Your Purchases",
    purchase_history_empty: "You haven't purchased anything yet.",
    purchase_item:
      "{{plan}} - {{price}} UZS\nStatus: {{status}}\nDate: {{date}}",

    // Logout
    logout_confirm: "Are you sure you want to logout?",
    logout_success:
      "You have successfully logged out. Press /start to login again.",

    // Errors
    error_occurred: "An error occurred. Please try again.",
    error_not_logged_in: "Please login first with /start command.",
  },
};
