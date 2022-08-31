const { Joi } = require("express-validation");



const createCategory = Joi.object({
  name: Joi.string().not().empty().required(),
});



module.exports = {

  createCategory: {
    body: createCategory,
  },

};
