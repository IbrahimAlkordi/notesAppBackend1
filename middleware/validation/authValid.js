const { Joi } = require("express-validation");
const User = require('../../models/user');

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
    .required().error(err=>{
      console.log(err[0].code)
    })
    .normalize(),
  password: Joi.string().trim().min(8).required().error(err=>{
    console.log(err[0].code)
  }),
  name: Joi.string().trim().not().empty().required().error(err=>{
    console.log(err[0].code)
  }),
});


module.exports = {
  login: {
    body: loginValidation,
  },
  signup: {
    body: signupValidation,
  },
 

};
