const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  telNum: String,
  username: String,
  password: String,
  accounts: [{ type: Schema.Types.ObjectId, ref: "Account" }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
