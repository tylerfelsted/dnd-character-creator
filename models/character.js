"use strict";

const client = require('../db');

class Character {
  static async create(userId, newCharacter) {
    const result = await client.db("characterCreator").collection("characters").insertOne({ userId, ...newCharacter });
    return result;
  }
}

module.exports = Character;