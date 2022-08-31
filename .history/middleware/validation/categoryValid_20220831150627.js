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



// package to be able to validate mongoDB id formats
// Joi.objectId = require("joi-objectid")(Joi);
// const categoryIdParams = Joi.object({
//   categoryId: Joi.objectId().required(),
// });
// const categoryIdsArrayBody = Joi.object({
//   categoryIds: Joi.array().items(Joi.objectId()).required(),
// });
// module.exports = {
//   getCategoryById: {
//     params: categoryIdParams,
//   },
  
//   updateCategory: {
//     params: categoryIdParams,
//     body: categoryNameBody,
//   },
//   deleteCategory: {
//     body: categoryIdsArrayBody,
//   },
// };

