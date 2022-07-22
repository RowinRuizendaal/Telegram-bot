// Index file for all the commands.
const dbConnection = require("./config/database/connection.js");
const fs = require("fs");

const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    console.log(`Loading command ${file}...`);
    require(`./commands/${file}`);
}