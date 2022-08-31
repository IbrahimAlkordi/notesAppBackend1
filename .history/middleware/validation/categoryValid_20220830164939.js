const { Joi } = require("express-validation");

const createCategory = Joi.object({
  name: Joi.string().not().empty().required().error(err=>{
    console.log("here is the erroe",err)
  }),
});

module.exports = {
  createCategory: {
    body: createCategory,
  },
};
