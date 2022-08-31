const { Joi } = require("express-validation");

Joi.objectId = require("joi-objectid")(Joi);


const createNoteBody = Joi.object({
  categoryId: Joi.objectId().required(),
  tags: Joi.array().items(Joi.objectId()).required(),
  content: Joi.string().not().empty().required(),
});



module.exports = {
  
  createNote: {
    body: createNoteBody,
  },

  
};