const { Joi } = require("express-validation");

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const signupValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().not().empty().required(),
});

const refreshTokenValidation = Joi.object({
  token: Joi.string().not().empty().required(),
});

module.exports = authValidation;
