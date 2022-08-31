const { validationResult } = require("express-validator/check");

const Category = require("../models/category");
const User = require("../models/user");

exports.createCategory = async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  let creator;

  const category = new Category({
    name: name,
    creator: req.userId,
  });
  try{
  const result = await category.save();
  const user = await User.findById(req.userId);
  creator = user;
  const userResult = await user.save();
  res.status(201).json({
    message: "category created successfully!",
    category: category,
    creator: { _id: creator._id, name: creator.name },
       
    
})}

  catch(error){
    if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
  }
    
 

};