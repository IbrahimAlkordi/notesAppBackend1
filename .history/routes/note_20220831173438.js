const express = require('express');
//const { body } = require('express-validator/check');
const isAuth = require("../middleware/is-auth")
const { validate } = require("express-validation");
const noteValidation = require("../middleware/validation/noteValid");

const User = require('../models/user');
const noteController = require('../controllers/note');

const router = express.Router();


router.post("/create",isAuth, validate(noteValidation.createNote, {}, { abortEarly: false }),noteController.createNote);
router.delete(
    "/",
    
    noteController.deleteNote
  );
//   validate(noteValidation.deleteNote, {}, { abortEarly: false }),

module.exports = router;