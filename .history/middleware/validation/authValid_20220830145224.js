const { Joi } = require("express-validation");

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});


const signupValidation = Joi.object({
  email: Joi.string()
    .email().message("Please enter a valid email.")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("E-Mail address already exists!");
        }
      });
    })
    .required()
    .normalize(),
  password: Joi.string().trim().min(8).required(),
  name: Joi.string().trim().not().empty().required(),
});

const refreshTokenValidation = Joi.object({
  token: Joi.string().not().empty().required(),
});

module.exports = {
  login: {
    body: loginValidation,
  },
  signup: {
    body: signupValidation,
  },
  refresh: {
    body: refreshTokenValidation,
  },
  logout: {
    body: refreshTokenValidation,
  },
};
