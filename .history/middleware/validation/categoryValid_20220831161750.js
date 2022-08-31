const { Joi } = require("express-validation");
//  Joi.objectId = require("joi-objectid")(Joi);

const createCategory = Joi.object({
  name: Joi.string()
    .not()
    .empty()
    .required()
    .error((err) => {
      console.log(err[0].code);
    }),
});

const getCategoryById = Joi.object({
  categoryId: Joi.required(),
});

const updateCategory = Joi.object({
  name: Joi.string().not().empty().required(),
});

module.exports = {
  createCategory: {
    body: createCategory,
  },
  updateCategory: {
    params: getCategoryById,
    body: updateCategory,
  },
  getCategoryById: {
    params: getCategoryById,
  },
};

// package to be able to validate mongoDB id formats
// Joi.objectId = require("joi-objectid")(Joi);

// const categoryIdsArrayBody = Joi.object({
//   categoryIds: Joi.array().items(Joi.objectId()).required(),
// });
// module.exports = {
//

//   updateCategory: {
//     params: categoryIdParams,
//     body: categoryNameBody,
//   },
//   deleteCategory: {
//     body: categoryIdsArrayBody,
//   },
// };