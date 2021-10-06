"use strict";

const { v4: uuidv4 } = require('uuid');
const client = require('../db');

const characterCollection = client.db("characterCreator").collection("characters");

class Character {
  static async findAll(userId) {
    const cursor = characterCollection.find({ userId });
    const characters = await cursor.toArray();
    return characters
  }

  static async find(characterId) {
    const character = await characterCollection.findOne({_id: characterId});
    return character;
  }

  static async create(userId, newCharacter) {
    const _id = uuidv4();
    const result = await characterCollection.insertOne({ _id, userId, ...newCharacter });
    return result;
  }

  static async update(characterId, updatedCharacter) {
    const result = await characterCollection.updateOne({_id: characterId}, {$set: updatedCharacter});
    return result;
  }

  static async delete(characterId) {
    const result = await characterCollection.deleteOne({_id: characterId});
    return result;
  }
}

module.exports = Character;