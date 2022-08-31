const express = require("express");
const { validate } = require("express-validation");
const isAuth = require("../middleware/is-auth");

const catValidation = require("../middleware/validation/categoryValid");
const categoryController = require('../controllers/category');

const router = express.Router();

router.post(
  "/create", isAuth, categoryController.createCategory);

module.exports = router;
