"use strict";

const express = require('express');
const { ensureCorrectUserLoggedIn } = require('../middleware/auth');

const Character = require('../models/character');

const router = new express.Router({mergeParams: true});


//Gets all characters belonging to one user
//Requires that user be logged in
router.get('/', ensureCorrectUserLoggedIn, async function(req, res, next) {
  try {
    const characters = await Character.findAll(res.locals.user._id);
    return res.status(200).json({ characters });
  } catch(err) {
    return next(err);
  }
});

//Gets a specific character
//Requires that user be logged in
router.get('/:characterId', ensureCorrectUserLoggedIn, async function(req, res, next) {
  try {
    const characterId = req.params.characterId;
    const character = await Character.find(characterId);
    return res.status(200).json({ character });
  } catch(err) {
    return next(err);
  }
});

//Creates a new character
router.post('/', ensureCorrectUserLoggedIn, async function(req, res, next) {
  try {
    const character = await Character.create(res.locals.user._id, req.body);
    return res.status(201).json({characterId: character.insertedId});
  } catch(err) {
    return next(err);
  }
});

//Updates an existing character
router.patch('/:characterId', ensureCorrectUserLoggedIn, async function(req, res, next) {
  try {
    const updatedCharacter = req.body;
    const characterId = req.params.characterId;
    const result = await Character.update(characterId, updatedCharacter);
    return res.status(200).json({result});
  } catch(err) {
    return next(err);
  }
});

//Deletes an existing character
router.delete('/:characterId', ensureCorrectUserLoggedIn, async function(req, res, next) {
  try {
    const characterId = req.params.characterId;
    const result = await Character.delete(characterId);
    return res.status(200).json({result});
  } catch(err) {
    return next(err);
  }
});

module.exports = router;