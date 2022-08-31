const { Joi } = require("express-validation");

// Joi.objectId = require("joi-objectid/index")(Joi);

const createNote = Joi.object({
  title: Joi.string().not().empty().required().error(err=>{
    console.log(err[0].code)
  }),
  content: Joi.string().not().empty().required().error(err=>{
    console.log(err[0].code)
  }),
  categoryID: Joi.objectId(),
  tags: Joi.array().items(Joi.objectId()),
});

const deleteNote = Joi.object({
  noteId: Joi.array().objectId().required(),
});

module.exports = {
  createNote: {
    body: createNote,
  },
  deleteNote: {
    body: deleteNote,
  },
};
