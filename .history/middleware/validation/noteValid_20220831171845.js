const { Joi } = require("express-validation");

Joi.objectId = require("joi-objectid/index")(Joi);

const createNote = Joi.object({
  title: Joi.string().not().empty().required().error(err=>{
    console.log(err[0].code)
  }),
  content: Joi.string().not().empty().required().error(err=>{
    console.log(err[0].code)
  }),
  categoryID: Joi.objectId().required(),
  tags: Joi.array().items(Joi.objectId()),
});

module.exports = {
  createNote: {
    body: createNote,
  },
};
