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
router.get("/", isAuth, categoryController.getCategories);
router.put(
  "/:categoryId",
  isAuth,
  // validate(validator.updateCategory, {}, { abortEarly: false }),
  categoryController.updateCategory
);

module.exports = router;
