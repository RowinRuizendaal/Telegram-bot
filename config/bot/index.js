require("dotenv").config();
const { TOKEN } = process.env || "TOKEN";
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(TOKEN, { polling: true });

module.exports = {
    bot,
};