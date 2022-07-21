const { DISCORDHOOK } = process.env || "TOKEN";
const { bot } = require("../config/index.js");

// bot on test command
bot.onText(/\/ping/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "bong");
});