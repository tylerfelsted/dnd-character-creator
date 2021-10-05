"use strict";
/** Database setup. */
const { MongoClient } = require("mongodb");
const { getDatabaseUri } = require("./config");

let db = new MongoClient(getDatabaseUri());

try {
  db.connect();
} catch(err) {
  console.error(err);
}

module.exports = db;