const { Joi } = require("express-validation");

const createCategory = Joi.object({
  name: Joi.string().not().empty().required().error(err=>{
    console.log(err[0].code)
  }),
});

module.exports = {
  createCategory: {
    body: createCategory,
  },
};
