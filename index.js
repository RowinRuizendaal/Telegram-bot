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

  // create options yes or no to generate joke
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Yes",
            callback_data: "yes",
          },
          {
            text: "No",
            callback_data: "no",
          },
        ],
      ],
    },
  };

  // send message to user
  bot.sendMessage(chatId, "Do you want to hear a joke?", options);

  // listen for callback
  bot.on("callback_query", (callbackQuery) => {
    const { data } = callbackQuery;

    // if user choose yes
    if (data === "yes") {
      // get joke
      axios.get(`https://moppenbot.nl/api/random/`).then((res) => {
        const { joke } = res.data.joke;
        bot.sendMessage(chatId, joke);
      });
    }
    // if user choose no
    if (data === "no") {
      bot.sendMessage(chatId, "Ok, maybe next time");
    }

    bot.answerCallbackQuery(callbackQuery.id);
  });
});

// matches "/casino"
bot.onText(/\/casino/, (msg) => {
  const chatId = msg.chat.id;

  const fruits = ["🍐", "🍇", "🍓", "🍋", "🍊", "🍎", "🍉", "🍒"];

  let slots = [];
  for (let i = 0; i < 3; i++) {
    slots[i] = fruits[Math.floor(Math.random() * fruits.length)];
  }

  if (slots[0] == slots[1] && slots[1] == slots[2]) {
    bot.sendMessage(
      chatId,
      `You rolled the slots [${slots[0]} ${slots[1]} ${slots[2]}] and won! 🎉`
    );
  } else if (
    slots[0] == slots[1] ||
    slots[0] == slots[2] ||
    slots[1] == slots[2]
  ) {
    bot.sendMessage(
      chatId,
      `You rolled the slots [${slots[0]} ${slots[1]} ${slots[2]}] and almost won (2/3)`
    );
  } else {
    bot.sendMessage(
      chatId,
      `You rolled the slots [${slots[0]} ${slots[1]} ${slots[2]}] and lost...`
    );
  }
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
