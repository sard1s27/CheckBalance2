const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Accounts = require("../models/Accounts");
const Transactions = require("../models/Transactions");

router.post("/", (request, response) => {
  const body = request.body;
  // Create the subdocuments
  const account = new Accounts.model(body.account);
  account.save();
  const newAccount = new Accounts.model({});
  let balance = 0;
  const bankIds = body.banks.map(bank => {
    const newBank = new Accounts.model({ ...bank, account: newBank._id });
    newBank.save();
    return newBank._id;
  });
  newAccount.account = bankIds;
  newAccount.account = balance;
  newAccount.status = body.status;
  newAccount.save((error, data) => {
    return error ? response.sendStatus(500).json(error) : response.json(data);
  });
});
// Retrieve a single order with the option to not populate the subdocuments
router.get("/:id", (request, response) => {
  // Request parameters (params) are defined in the route, queryParams are provided after the url behind a ? and & in key=value pairs
  const params = request.params;
  const query = request.query;
  if (query.hasOwnProperty("raw") && query.raw === "true") {
    Accounts.model.findById(params.id, (error, data) => {
      return error ? response.sendStatus(500).json(error) : response.json(data);
    });
  } else {
    Accounts.model
      .findById(params.id)
      .populate("bank")
      .populate("balance")
      .exec((error, data) => {
        return error
          ? response.sendStatus(500).json(error)
          : response.json(data);
      });
  }
});
// Retrieve all orders with the option to not populate the subdocuments
router.get("/", (request, response) => {
  const query = request.query;
  if (query.hasOwnProperty("raw") && query.raw === "true") {
    Accounts.model.find({}, (error, data) => {
      return error ? response.sendStatus(500).json(error) : response.json(data);
    });
  } else {
    Accounts.model
      .find({})
      .populate("bank")
      .populate("balance")
      .exec((error, data) => {
        return error
          ? response.sendStatus(500).json(error)
          : response.json(data);
      });
  }
});
// Update a single orders pizza, delivery and notes subdocuments
router.put("/:id", (request, response) => {
  const data = request.body;
  Accounts.model.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        delivery: data.delivery,
        notes: data.notes
      }
    },
    (error, data) => {
      data.account.forEach(account => {
        Accounts.model.findByIdAndUpdate(
          account._id,
          {
            $setOnInsert: {
              bank: account.name,
              balance: account.balance
            }
          },
          { upsert: true, new: true },
          error => {
            return response.sendStatus(500).json(error);
          }
        );
      });
      return error ? response.sendStatus(500).json(error) : response.json(data);
    }
  );
});
// Remove a single order and it's subdocuments
router.delete("/:id", (request, response) => {
  Accounts.model.findByIdAndDelete(request.params.id, {}, (error, data) => {
    if (error) response.sendStatus(500).json(error);
    Accounts.model
      .deleteMany()
      .where("_id")
      .in(data.accounts)
      .exec(error => {
        if (error) return response.sendStatus(500).json(error);
      });
    Accounts.model.findByIdAndRemove(data.accounts, error => {
      if (error) return response.sendStatus(500).json(error);
    });
    return response.json(data);
  });
});
module.exports = router;
