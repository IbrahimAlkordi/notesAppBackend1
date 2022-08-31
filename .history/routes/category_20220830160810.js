const express = require("express");
const { validate } = require("express-validation");

const catValidation = require("./categories-validation");
const categoryController = require('../controllers/category');

const router = express.Router();

router.post(
  "/create",
  validate(catValidation.createCategory, {}, { abortEarly: false }),
  categoryController.createCategory
);

module.exports = router;
