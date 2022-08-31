const { validationResult } = require("express-validator/check");

const Note = require("../models/note");
const User = require("../models/user");

exports.createNote = async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  const categoryID = req.body.categoryID;
  const tags = req.body.tags;
  let creator;

  const note = new Note({
    title: title,
    content: content,
    creator: req.userId,
    categoryID: categoryID,
    tags: tags,
  });
  try{
  const result = await note.save();
  const user = await User.findById(req.userId);
  creator = user;
  const userResult = await user.save();
  res.status(201).json({
    message: "Note created successfully!",
    note: note,
    creator: { _id: creator._id, name: creator.name },
       
    
})}

  catch(error){
    if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
  }
    
 

};



// const { validationResult } = require("express-validator/check");

// const Note = require("../models/note");
// const User = require("../models/user");

// exports.createNote = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error = new Error("Validation failed, entered data is incorrect.");
//     error.statusCode = 422;
//     throw error;
//   }

//   const title = req.body.title;
//   const content = req.body.content;
//   const categoryID = req.body.categoryID;
//   const tags = req.body.tags;
//   let creator;

//   const note = new Note({
//     title: title,
//     content: content,
//     creator: req.userId,
//     categoryID: categoryID,
//     tags: tags,
//   });
//   note.save().then((result) => {
//       return User.findById(req.userId);
//     })
//     .then((user) => {
//       creator = user;
//       //   user.notes.push(note);
//       return user.save();
//     })
//     .then((result) => {
//       res.status(201).json({
//         message: "Note created successfully!",
//         note: note,
//         creator: { _id: creator._id, name: creator.name },
//       });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };
