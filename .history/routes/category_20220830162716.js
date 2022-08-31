const express = require("express");
const { validate } = require("express-validation");

const catValidation = require("../middleware/validation/categoryValid");
const categoryController = require('../controllers/category');

const router = express.Router();

router.post(
  "/create", categoryController.createCategory);

module.exports = router;
