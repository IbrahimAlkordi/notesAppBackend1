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
  categoryId: Joi.objectId().required(),
});

const updateCategory = Joi.object({
  name: Joi.string().not().empty().required(),
});
const deleteCategory = Joi.object({
  categoryIds: Joi.array().items(Joi.objectId()).required(),
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
    deleteCategory: {
    body: deleteCategory,
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