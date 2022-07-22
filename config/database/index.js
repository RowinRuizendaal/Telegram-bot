const dbConfig = require("./config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Database connection
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.URI;

module.exports = db;