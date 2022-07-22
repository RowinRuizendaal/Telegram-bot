require("dotenv").config();
const { createUser, updateToken } = require("../helpers/database.js");
const { httpPost } = require("../helpers/axios.js");
const { bot } = require("../config/bot/index.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

const updateUser = async({ id, token }) => {
    const encryptedToken = await bcrypt.hash(token, saltRounds);

    const updateUserToken = await updateToken({
        id,
        token: encryptedToken,
    });

    if (updateUserToken) {
        return bot.sendMessage(id, `Your token has been updated!`);
    }
};

module.exports = {
    registerUser,
    updateUser,
};