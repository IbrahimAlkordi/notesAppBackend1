const { Joi } = require("express-validation");
const User = require('../../models/user');

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});


const signupValidation = Joi.object({
  email: Joi.string().email().normalize().required(),
  password: Joi.string().trim().min(8).required(),
  name: Joi.string().trim().not().empty().required()
});


module.exports = {
  login: {
    body: loginValidation,
  },
  signup: {
    body: signupValidation,
  },
 

};
