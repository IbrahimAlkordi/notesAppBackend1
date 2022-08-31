const express = require("express");
const { validate } = require("express-validation");
const isAuth = require("../middleware/is-auth");
const tagValidation = require("../middleware/validation/tagValid");
const tagController = require("../controllers/tag");

const router = express.Router();

router.post("/create",isAuth,validate(tagValidation.createtag, {}, { abortEarly: false }), tagController.createTag);

module.exports = router;
