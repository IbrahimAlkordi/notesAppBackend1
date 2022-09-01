const express = require("express");

const { validate } = require("express-validation");
const authValidation = require("../middleware/validation/authValid");

const authController = require("../controllers/auth");

const router = express.Router();

router.put(
  "/signup",
  validate(authValidation.signup, {}, { abortEarly: false }),
  authController.signup
);

router.post(
  "/login",
  validate(authValidation.login, {}, { abortEarly: false }),
  authController.login
);

module.exports = router;
