const { Joi } = require("express-validation");

const createCategory = Joi.object({
  name: Joi.string().not().empty().required().error(err=>{
    console.log(err[0].message)
  }),
});

module.exports = {
  createCategory: {
    body: createCategory,
  },
};
