const { Joi } = require("express-validation");

const createtag = Joi.object({
  name: Joi.string().not().empty().required().error(err=>{
    console.log(err[0].code)
  }),
});

module.exports = {
  createtag: {
    body: createtag,
  },
};
