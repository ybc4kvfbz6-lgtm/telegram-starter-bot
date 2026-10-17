
import { InlineKeyboard } from "grammy";

export function registerCommands(bot) {
  bot.command("start", async (ctx) => {
    await ctx.reply(
      `🎮 Welcome to Free Fire Info Check Bot!

Hello ${ctx.from?.first_name ?? "Player"}!

Send /check followed by a Free Fire UID to check player information.

Commands:
/start - Start the bot
/help - Show help
/check UID - Check player
/id - Show your Telegram ID`,
      {
        reply_markup: new InlineKeyboard()
          .text("🎮 Check UID", "check_uid")
          .text("🆔 My ID", "show_id"),
      }
    );
  });

  bot.command("help", (ctx) =>
    ctx.reply(
      "🎮 Free Fire UID Bot\n\n" +
      "/start - Start bot\n" +
      "/help - Help menu\n" +
      "/check 123456789 - Check UID\n" +
      "/id - Telegram ID\n\n" +
      "⚠️ Player information requires a working API."
    )
  );

  bot.command("id", (ctx) =>
    ctx.reply(
      `Chat ID: ${ctx.chat.id}\n` +
      `Your ID: ${ctx.from?.id ?? "Unknown"}`
    )
  );

  bot.command("check", async (ctx) => {
    const uid = ctx.match?.trim();

    if (!uid || !/^\d{6,15}$/.test(uid)) {
      return ctx.reply(
        "❌ Invalid UID format.\n\nUse: /check 123456789"
      );
    }

    await ctx.reply(
      `🔎 UID received: ${uid}\n\n` +
      "Player lookup API is not connected yet. " +
      "Connect a trusted API to retrieve player details."
    );
  });

  bot.callbackQuery("check_uid", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply("Send a UID using /check 123456789");
  });

  bot.callbackQuery("show_id", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(
      `Your Telegram ID: ${ctx.from.id}`
    );
  });

  bot.on("message:text", async (ctx) => {
    if (ctx.message.text.startsWith("/")) return;

    await ctx.reply(
      "🎮 To check a Free Fire player, send:\n/check 123456789"
    );
  });
}
