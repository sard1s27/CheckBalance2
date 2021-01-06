const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const accountSchema = new mongoose.Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  name: String,
  balance: Number,
  transactions: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
