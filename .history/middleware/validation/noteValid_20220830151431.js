const { Joi } = require("express-validation");

Joi.object = require("joi-objectid")(Joi);

const createNoteBody = Joi.object({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
  categoryId: Joi.object(),
  tags: Joi.array().items(Joi.object()),
});

module.exports = {
  createNote: {
    body: createNoteBody,
  },
};
