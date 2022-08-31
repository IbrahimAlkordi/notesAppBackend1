const Category = require("../models/category");
const User = require("../models/user");
const Note = require("../models/note");

exports.createCategory = async (req, res, next) => {
  const id = req.userId;
  const name = req.body.name;

  try {
    const existCategory = await Category.findOne({ name: name });
    //category already exists
    if (existCategory) {
      return res.status(409).json({
        message: "Category already exists.",
      });
    }

    const category = new Category({
      name: name,
      createdBy: id,
    });

    const categoryResult = await category.save();
    const user = await User.findById(id);
    const userResult = await user.save();
    res.status(201).json({
      message: "Category Created",
      category: categoryResult,
      creator: { _id: user._id, name: user.name },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    // categories: array of category objects
    const categories = await Category.find({});

    //category array is empty
    if (categories.length === 0) {
      return res.status(409).json({
        message: "No Category found",
      });
    }

    // res.status(200).send(categories);

    res.status(200).json({
      message: "Available Categories",
      categories: categories,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    // category: category object

    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);

    if (!category) {
      const error = new Error("category Not Found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "found this category with this id  " + categoryId,
      category: category,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const userId = req.userId;
    const categoryId = req.params.categoryId;
    const name = req.body.name;
    const result = await Category.updateOne(
      { _id: categoryId },
      { $set: { name: name, updatedBy: userId } }
    );
    const category = await Category.findById(categoryId);
    res.status(200).json({
      message: "category has updated",
      category: category,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


// exports.deleteCategory = async (req, res, next) => {
//     try {

//         const categoryIds = body.categoryIds;
//         // deleteCategory is dynamic since it can both delete one or many categories
//         // categoryIds is an array of category Ids
      
//         // check to find if any notes is still linked to any of the categories that we want to delete and return their number
//         const notesCount = await Note.find({
//           category: {
//             $in: categoryIds,
//           },
//         }).countDocuments();
//         // if return number is not zero, that means that some notes are still linked and need to be unlinked before deletion. throw an error in this case
//         if (notesCount > 0) {
//           const error = new Error(errors.categoryStillLinked);
//           error.statusCode = 401;
//           throw error;
//         }
//         // delete all the categories that have their ids in the categoryIds array
//         const res = await Category.deleteMany({
//           _id: {
//             $in: categoryIds,
//           },
//         });
//         // if no categories are deleted that means no categories match the ids and throw an error
//         if (res.deletedCount === 0) {
//           const error = new Error(errors.categoryNotFound);
//           error.statusCode = 404;
//           throw error;
//         }
      
//       await service.deleteCategory(req.body);
//       // check if we are deleting one or many categories to format the response message accordingly
//       let message = req.body.categoryIds.length > 1 ? "Categories" : "Category";
//       message += " successfully deleted!";
//       res.status(200).send({ message: message });
//     } catch (err) {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     }
//   };