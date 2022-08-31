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

exports.deleteNote = async (req, res, next) => {
  const noteId = req.body.noteId;
  try {
    const result = await Note.deleteOne({ id: noteId });
    res.status(200).json({ 
        message: "Note Deleted Successfuly",
        result: result 
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

}

exports.updateNote = async (req, res, next) => {
  try {
    const userId = req.userId;
    const noteId = req.params.noteId;
    const content = req.body.content;
    const title = req.body.title;
    
    const result = await Note.updateOne(
      { _id: noteId },
      { $set: { title: title,content:content, updatedBy: userId } }
    );
    const note = await Note.findById(noteId);
    res.status(200).json({
      message: "note has updated",
      note: note,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
