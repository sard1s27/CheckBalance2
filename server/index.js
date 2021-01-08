const express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");

const User = require("./models/User");
const Account = require("./models/Accounts");
const Transaction = require("./models/Transaction");

app.use(cors());
app.use(bodyParser.json());

const mongoose = require("mongoose");
//we can change it later
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });

const port = 3000;

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.post("/login", async (request, response) => {
  const { username, password } = request.body;
  let user = await User.findOne({ username, password });

  if (!user) {
    response.status(405);
    response.send("fail");
  } else {
    delete user.password;
    response.json(user);
  }
});

app.get("/account-info/:id", async (request, response) => {
  let { id } = request.params;
  let accounts = await Account.find({ owner: id });
  let user = await User.findOne({ _id: id });

  response.json({ accounts, user });
});

app.get("/account-info", async (request, response) => {
  // let accounts = await Account.find({ owner: id });
  let user = await User.find({});

  response.json({ user });
});

app.post("/register", async (request, response) => {
  const {
    firstName,
    lastName,
    username,
    password,
    telNum,
    email
  } = request.body;
  let user = await User.create({
    firstName,
    lastName,
    username,
    password,
    telNum,
    email
  });
  // let account = await Account.create({owner: user, balance: 0 })

  if (user) {
    response.send("ok");
  } else {
    response.status(405);
    response.send("fail");
  }
});

app.delete("/delete-account/:id", async (request, response) => {
  let x = await Account.deleteOne({ _id: request.params.id });
  response.send("ok");
});

app.put("/update-account/:id/:balance", async (request, response) => {
  let x = await Account.updateOne(
    { _id: request.params.id },
    { balance: request.params.balance }
  );
  response.send("ok");
});
app.post("/add-new-account/:id", async (request, response) => {
  let { id } = request.params;
  let user = await User.findOne({ _id: id });

  let account = await Account.create({
    owner: user,
    balance: request.body.amount,
    name: request.body.name
  });

  if (account == true) {
    response.send("ok");
  } else {
    response.status(405);
    response.send("fail");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
