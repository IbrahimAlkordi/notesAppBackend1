const { Joi } = require("express-validation");

Joi.objectId = require("joi-objectid/index")(Joi);

const createNote = Joi.object({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
  categoryId: Joi.objectId().not().empty().required(),
  tags: Joi.array(),
  userId : Joi.objectId().not().empty().required(),
});

const deleteNote = Joi.object({
  noteId: Joi.objectId().required(),
});

const updateNote = Joi.object({
  title: Joi.string().not().empty(),
  content: Joi.string().not().empty(),
  categoryId :Joi.objectId(),
  tags: Joi.array(),
});

const getNoteById = Joi.object({
  noteId: Joi.objectId().required(),
});
const getNotes = Joi.object({
  categoryId: Joi.objectId(),
  tags : Joi.string(),
});
module.exports = {
  createNote: {
    body: createNote,
  },
  deleteNote: {
    body: deleteNote,
  },
  updateNote: {
    body: updateNote,
  },
  getNoteById: {
    params: getNoteById,
  },
  getNotes: {
    params: getNotes,
  },
};
