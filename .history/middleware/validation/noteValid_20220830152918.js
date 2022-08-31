const { Joi } = require("express-validation");

Joi.objectId = require("joi-objectid/index")(Joi);

const createNote = Joi.object({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
  categoryId: Joi.objectId(),
  tags: Joi.array().items(Joi.objectId()),
});

module.exports = {
  createNote: {
    body: createNote,
  },
};
