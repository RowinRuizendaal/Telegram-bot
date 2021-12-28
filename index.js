require("dotenv").config();

const fs = require("fs");

const TelegramBot = require("node-telegram-bot-api");

const { TOKEN } = process.env || "TOKEN";

const bot = new TelegramBot(TOKEN, { polling: true });
const axios = require("axios");

// matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // msg is the received Message from Telegram
  // match is the result of executing the regexp above on the text content
  // of the message
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// matches "/joke"
bot.onText(/\/joke/, (msg) => {
  const chatId = msg.chat.id;

  axios.get(`https://moppenbot.nl/api/random/`).then((res) => {
    const { joke } = res.data.joke;
    bot.sendMessage(chatId, joke);
  });
});

// save image to local sent to bot
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const { photo } = msg;
  if (photo) {
    const fileId = photo[photo.length - 1].file_id;

    // download and save image in images folder
    bot.downloadFile(fileId, `images/`).then(() => {
      bot.sendMessage(chatId, "Image saved");
    });
  }
});
