const { bot } = require("../config/bot/index.js");
const userControllers = require("../controllers/user.js");

// bot on test command
bot.onText(/\/register/, async(msg) => {
    const userName = msg.from.first_name;
    const userid = msg.from.id;

    userControllers.registerUser({
        name: userName,
        id: userid,
    });
});