const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  UserName: String,
  role: String,
  password: String,
});

const user = mongoose.model("userData", userSchema);

module.exports = { user };
