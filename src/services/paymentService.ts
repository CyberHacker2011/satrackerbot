import TelegramBot from "node-telegram-bot-api";
import { getUserByTelegramId } from "./userService";
import {
  createPremiumRequest,
  getPremiumRequestById,
  updatePremiumRequest,
  getPlanName,
  getPlanPrice,
} from "./premiumService";
import { updateSessionState } from "./sessionService";
import { t } from "../localization";
import { config } from "../config";
import { createAdminPremiumKeyboard } from "../utils/keyboards";

export async function handlePremiumSelection(
  bot: TelegramBot,
  chatId: number,
  telegramId: number,
  planType: "1month" | "3month",
): Promise<void> {
  try {
    const user = await getUserByTelegramId(telegramId);

    if (!user) {
      await bot.sendMessage(chatId, t("error_not_logged_in", "uz"));
      return;
    }

    const cardInfo = t("payment_card", user.language, {
      cardNumber: config.cardNumber,
      cardHolder: config.cardHolder,
    });

    await bot.sendMessage(chatId, cardInfo, { parse_mode: "Markdown" });
    await bot.sendMessage(chatId, t("receipt_prompt", user.language));

    updateSessionState(telegramId, "awaiting_receipt", { planType });
  } catch (error) {
    console.error("Error in handlePremiumSelection:", error);
    await bot.sendMessage(chatId, t("error_occurred", "uz"));
  }
}

export async function handleReceiptUpload(
  bot: TelegramBot,
  msg: TelegramBot.Message,
  fileId: string,
  planType: "1month" | "3month",
): Promise<void> {
  const chatId = msg.chat.id;
  const telegramId = msg.from!.id;

  try {
    const user = await getUserByTelegramId(telegramId);

    if (!user) {
      await bot.sendMessage(chatId, t("error_not_logged_in", "uz"));
      return;
    }

    const request = await createPremiumRequest(
      telegramId,
      user.email,
      planType,
      fileId,
    );

    if (request) {
      // Notify user
      await bot.sendMessage(chatId, t("payment_submitted", user.language));

      // Notify admin
      const adminMessage = t("premium_request", "uz", {
        email: user.email,
        plan: getPlanName(planType),
        price: getPlanPrice(planType).toString(),
      });

      await bot.sendMessage(config.adminChatId, adminMessage, {
        reply_markup: createAdminPremiumKeyboard(request.id),
      });

      // If there's a receipt, forward it to admin
      if (fileId) {
        if (msg.photo) {
          await bot.sendPhoto(config.adminChatId, fileId, {
            caption: `Receipt from ${user.email}`,
          });
        } else if (msg.document) {
          await bot.sendDocument(config.adminChatId, fileId, {
            caption: `Receipt from ${user.email}`,
          });
        }
      }

      updateSessionState(telegramId, "idle");
    } else {
      await bot.sendMessage(chatId, t("error_occurred", user.language));
    }
  } catch (error) {
    console.error("Error in handleReceiptUpload:", error);
    await bot.sendMessage(chatId, t("error_occurred", "uz"));
  }
}

export async function handleAdminApprove(
  bot: TelegramBot,
  chatId: number,
  requestId: string,
): Promise<void> {
  try {
    const request = await getPremiumRequestById(requestId);

    if (!request) {
      await bot.answerCallbackQuery(chatId.toString(), {
        text: "Request not found",
      });
      return;
    }

    const updated = await updatePremiumRequest(requestId, {
      status: "approved",
    });

    if (updated) {
      const user = await getUserByTelegramId(request.user_telegram_id);

      if (user) {
        await bot.sendMessage(
          request.user_telegram_id,
          t("premium_approved", user.language),
        );
      }

      await bot.sendMessage(
        chatId,
        `✅ Premium request approved for ${request.user_email}`,
      );
    }
  } catch (error) {
    console.error("Error in handleAdminApprove:", error);
    await bot.sendMessage(chatId, "Error approving request");
  }
}

export async function handleAdminReject(
  bot: TelegramBot,
  chatId: number,
  requestId: string,
  reason?: string,
): Promise<void> {
  try {
    const request = await getPremiumRequestById(requestId);

    if (!request) {
      await bot.sendMessage(chatId, "Request not found");
      return;
    }

    const updated = await updatePremiumRequest(requestId, {
      status: "rejected",
      admin_note: reason || "No reason provided",
    });

    if (updated) {
      const user = await getUserByTelegramId(request.user_telegram_id);

      if (user) {
        await bot.sendMessage(
          request.user_telegram_id,
          t("premium_rejected", user.language, {
            reason: reason || "Not specified",
          }),
        );
      }

      await bot.sendMessage(
        chatId,
        `❌ Premium request rejected for ${request.user_email}`,
      );
    }
  } catch (error) {
    console.error("Error in handleAdminReject:", error);
    await bot.sendMessage(chatId, "Error rejecting request");
  }
}
