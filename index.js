// Index file for all the commands.

const fs = require("fs");
require("dotenv").config();

const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    console.log(`Loading command ${file}...`);
    require(`./commands/${file}`);
}