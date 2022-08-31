const { Joi } = require("express-validation");

Joi.objectId = require("joi-objectid/index")(Joi);

const createNoteBody = Joi.object({
  title: Joi.string().not().empty().error((errors) => {
    errors.forEach((err) => {
        switch (err.type) {
            case 'string.empty':
                err.message = 'Invalid Title';
                break;
            case 'any.required':
                err.message = `Title is required`;
                break;
            case 'string.min':
                err.message = `Title must be at least 1 character`;
                break;
            case 'string.max':
                err.message = `Title must be at most 16 character`;
                break;
            default:
                break;
        }})}).required(),
  content: Joi.string().not().empty().required(),
  categoryId: Joi.objectId(),
  tags: Joi.array().items(Joi.objectId()),
});

module.exports = {
  createNote: {
    body: createNoteBody,
  },
};
