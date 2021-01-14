const { Long } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const accountSchema = new mongoose.Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  name: String,
  balance: Number,
  transaction: [{ type: Schema.Types.ObjectId, ref: "Transaction" }]
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
