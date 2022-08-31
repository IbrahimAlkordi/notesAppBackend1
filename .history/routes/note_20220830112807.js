const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const noteController = require('../controllers/note');

const router = express.Router();


router.post("/create", noteController.createNote);




module.exports = router;
