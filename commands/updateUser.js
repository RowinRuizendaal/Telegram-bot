const { bot } = require("../config/bot/index.js");
const userControllers = require("../controllers/user.js");

// bot on test command
bot.onText(/\/update (.+)/, async(msg, match) => {
    const chatId = msg.chat.id;
    const message = match[1]; // the captured "whatever"
    const userid = msg.from.id;

    userControllers.updateUser({
        id: userid,
        token: message,
    });
});