const { Joi } = require("express-validation");

Joi.object = require("joi-object")(Joi);


const createNoteBody = Joi.object({
  categoryId: Joi.object().required(),
  tags: Joi.array().items(Joi.object()).required(),
  content: Joi.string().not().empty().required(),
});



module.exports = {
  
  createNote: {
    body: createNoteBody,
  },

  
};