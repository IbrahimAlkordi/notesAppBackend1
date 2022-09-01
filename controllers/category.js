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


exports.deleteCategory = async (req, res, next) => {
    const categoryId = req.body.categoryId;
    try {
    const notesOfThisCatCount = await Note.find({
      category: categoryId,
    }).countDocuments();
    if (notesOfThisCatCount > 0) {
      const error = new Error("Cannot delete this category, it's linked to notes.");
      error.statusCode = 401;
      throw error;
    }
  
      const result = await Category.deleteOne({ id: categoryId });
      res.status(200).json({ 
          message: "Deleted Successfuly",
          result: result 
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };



