const express = require('express');
const { body } = require('express-validator/check');
const isAuth = require("../middleware/is-auth")
const { validate } = require("express-validation");
const authValidation = require("../middleware/validation/authValid");

const User = require('../models/user');
const noteController = require('../controllers/note');

const router = express.Router();


router.post("/create",isAuth, validate(authValidation.login),noteController.createNote);




module.exports = router;
