const express = require('express');
const { body } = require('express-validator/check');
const isAuth = require("../middleware/is-auth")

const User = require('../models/user');
const noteController = require('../controllers/note');

const router = express.Router();


router.post("/create",isAuth, noteController.createNote);




module.exports = router;
