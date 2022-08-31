const express = require("express");
const { validate } = require("express-validation");

const isAuth = require("../middleware/is-auth");
const validator = require("./tags-validation");
const { createTag } = require("./tags-controller");

const router = express.Router();

router.post(
  "/create",
  validate(validator.createTag, {}, { abortEarly: false }),
  createTag
);

module.exports = router;
