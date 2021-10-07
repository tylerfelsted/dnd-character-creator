"use strict";

const { v4: uuidv4 } = require('uuid');
const client = require('../db');

const characterCollection = client.db("characterCreator").collection("characters");

class Character {
  //Finds all characters belonging to one user
  //Returns an array of characters
  static async findAll(userId) {
    const cursor = characterCollection.find({ userId });
    const characters = await cursor.toArray();
    return characters
  }

  //Finds a specific character by Id
  static async find(characterId) {
    const character = await characterCollection.findOne({_id: characterId});
    return character;
  }

  //Creates a new character
  static async create(userId, newCharacter) {
    const _id = uuidv4();
    const result = await characterCollection.insertOne({ _id, userId, ...newCharacter });
    return result;
  }

  //Updates an existing character
  static async update(characterId, updatedCharacter) {
    const result = await characterCollection.updateOne({_id: characterId}, {$set: updatedCharacter});
    return result;
  }

  //Deletes an existing character
  static async delete(characterId) {
    const result = await characterCollection.deleteOne({_id: characterId});
    return result;
  }
}

module.exports = Character;