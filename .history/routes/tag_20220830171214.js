const express = require("express");
// const { validate } = require("express-validation");

const isAuth = require("../middleware/is-auth");
// const validator = require("./tags-validation");
 const tagController = require("../controllers/tag");

const router = express.Router();

router.post(
  "/create",
//   validate(validator.createTag, {}, { abortEarly: false }),
tagController.createTag
);

module.exports = router;
