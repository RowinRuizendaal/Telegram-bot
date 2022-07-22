const path = require("path");
require("dotenv").config();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_NAME}.ynkqghh.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

module.exports = { URI };