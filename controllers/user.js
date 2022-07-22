const { createUser } = require("../helpers/database.js");
const { httpPost } = require("../helpers/axios.js");
const { bot } = require("../config/bot/index.js");
require("dotenv").config();

const registerUser = async({ name, id }) => {
    const user = await createUser({
        name,
        id,
    });

    if (user) {
        httpPost(`${process.env.DISCORDHOOK}`, {
            content: `${name} has joined the telegram server! with id: ${id}`,
        });

        return bot.sendMessage(id, `Welcome ${name}!`);
    }

    return bot.sendMessage(
        id,
        `Something went wrong or you are already registered!`
    );
};

module.exports = {
    registerUser,
};