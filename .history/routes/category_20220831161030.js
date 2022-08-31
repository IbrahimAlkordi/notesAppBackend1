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

router.get("/:categoryId", isAuth, categoryController.getCategoryById);
router.get(
  "/",
  isAuth,
  validate(catValidation.getCategoryById, {}, { abortEarly: false }),
  categoryController.getCategories
);
router.put(
  "/:categoryId",
  isAuth,
  validate(catValidation.updateCategory, {}, { abortEarly: false }),
  categoryController.updateCategory
);

module.exports = router;
