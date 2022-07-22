const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    id: Number,
    token: String,
});

exports.userSchema = userSchema;
module.exports = new mongoose.model("users", userSchema);