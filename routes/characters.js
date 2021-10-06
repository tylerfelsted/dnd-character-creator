"use strict";

const express = require('express');

const Character = require('../models/character');

const router = new express.Router();

router.post('/', async function(req, res, next) {
  try {
    const character = await Character.create(res.locals.user._id, req.body);
    return res.status(201).json({characterId: character.insertedId});
  } catch(err) {
    return next(err);
  }
});

module.exports = router;