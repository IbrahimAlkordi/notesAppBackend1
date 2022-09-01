const express = require("express");
const isAuth = require("../middleware/is-auth");
const { validate } = require("express-validation");
const noteValidation = require("../middleware/validation/noteValid");
const noteController = require("../controllers/note");

const router = express.Router();

router.post(
  "/create",
  isAuth,
  validate(noteValidation.createNote, {}, { abortEarly: false }),
  noteController.createNote
);

router.delete(
  "/",
  validate(noteValidation.deleteNote, {}, { abortEarly: false }),
  noteController.deleteNote
);

router.put(
  "/:noteId",
  isAuth,
  validate(noteValidation.updateNote, {}, { abortEarly: false }),
  noteController.updateNote
);

router.get(
  "/:noteId",
  isAuth,
  validate(noteValidation.getNoteById, {}, { abortEarly: false }),
  noteController.getNoteById
);

router.get(
  "/",
  isAuth,
  validate(noteValidation.getNotes, {}, { abortEarly: false }),
  noteController.getNotes
);

module.exports = router;
