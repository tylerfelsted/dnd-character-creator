"use strict";
/** Database setup. */
const { MongoClient } = require("mongodb");
const { getDatabaseUri } = require("./config");

let client = new MongoClient(getDatabaseUri());

try {
  client.connect();
} catch(err) {
  console.error(err);
}

module.exports = client;