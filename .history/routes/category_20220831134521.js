const express = require("express");
const { validate } = require("express-validation");
const isAuth = require("../middleware/is-auth");
const catValidation = require("../middleware/validation/categoryValid");
const categoryController = require("../controllers/category");

const router = express.Router();

router.post(
  "/create",
  isAuth,
  validate(catValidation.createCategory, {}, { abortEarly: false }),
  categoryController.createCategory
);

router.get("/:categoryId", categoryController.getCategoryById);
router.get("/", isAuth, categoryController.getCategories);
// ,validate(validator.getCategoryById, {}, { abortEarly: false })
module.exports = router;