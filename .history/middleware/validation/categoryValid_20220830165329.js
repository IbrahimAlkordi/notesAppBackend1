const { Joi } = require("express-validation");

const createCategory = Joi.object({
  name: Joi.string().not().empty().required().error(err=>{
    err[0].message
  }),
});

module.exports = {
  createCategory: {
    body: createCategory,
  },
};
