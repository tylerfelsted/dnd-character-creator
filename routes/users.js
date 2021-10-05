"use strict";

const express = require('express');

const User = require('../models/user');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const router = new express.Router();

router.post("/register", async function(req, res, next) {
  try {
    const result = await User.register(req.body);
    const token = jwt.sign({username: req.body.username, _id: result.insertedId}, SECRET_KEY)
    return res.status(201).json({ token });
  } catch(err) {
    return next(err);
  }
});

router.post("/login", async function(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.login(username, password);
    const token = jwt.sign(user, SECRET_KEY);
    return res.status(200).json({ token })
  } catch(err) {
    return next(err)
  }
});

module.exports = router;