"use strict";

const client = require('../db');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');
const { v4: uuidv4 } = require('uuid');

const { BadRequestError, UnauthorizedError } = require('../expressError');

class User {

  static async register(newUser) {
    const { username, password } = newUser;
    const duplicateCheck = await client.db("characterCreator").collection("users").findOne({username: username});
    if(duplicateCheck) {
      throw new BadRequestError("Username is already taken");
    }
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    newUser.password = hashedPassword;
    newUser._id = uuidv4();
    const result = await client.db("characterCreator").collection("users").insertOne(newUser);

    return result;
  }

  static async login(username, password) {
    const user = await client.db("characterCreator").collection("users").findOne({username: username});
    if(user && await bcrypt.compare(password, user.password)) {

      delete user.password;
      return user; 
    } else throw new UnauthorizedError("Invalid Username/Password");
  }
}

module.exports = User;