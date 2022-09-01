const { validationResult } = require("express-validator/check");
const Category = require("../models/category");
const Note = require("../models/note");
const User = require("../models/user");
const mongoose = require("mongoose");

exports.createNote = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  const categoryId = req.body.categoryId;
  const tags = req.body.tags;
  let creator;

  const note = new Note({
    title: title,
    content: content,
    userId: req.userId,
    categoryId: categoryId,
    tags: tags,
  });
  try {
    const result = await note.save();
    const user = await User.findById(req.userId);
    creator = user;
    const userResult = await user.save();
    res.status(201).json({
      message: "Note created successfully!",
      note: note,
      creator: { _id: creator._id, name: creator.name },
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteNote = async (req, res, next) => {
  const noteId = req.body.noteId;
  const userId = req.body.userId;
  try {

    if(Note.userId===userId){
    const result = await Note.deleteOne({ id: noteId });
    res.status(200).json({
      message: "Note Deleted Successfuly",
      result: result,
    });
  }
  res.status(200).json({
    message: "you re not the creator,you cant delete this note",
  });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateNote = async (req, res, next) => {
  const noteId = req.params.noteId;
  const title = req.body.title;
  const content = req.body.content;
  const categoryId = req.body.categoryId;
  const tags = req.body.tags;
  try {
    const noteFound = await Note.findById(noteId);
    if (!noteFound) {
      const error = new Error("Note Not Found");
      error.statusCode = 404;
      throw error;
    }
    // const categoryFound = await Category.findById(categoryId);
    // if (!categoryFound) {
    //   const error = new Error("Category Id Not Found");
    //   error.statusCode = 404;
    //   throw error;
    // }
    const result = await Note.updateOne(
      { _id: noteId },
      {
        $set: {
          title: title,
          content: content,
          categoryId: categoryId,
          tags: tags,
          
        },
      }
    );
    const updatedNote = await Note.findById(noteId);
    res.status(200).json({
      message: "Note updated successfully",
      updatedNote: updatedNote,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getNoteById = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const note = await Note.findById(noteId);
    if (!note) {
      const error = new Error("Note Not Found pleaze check the id");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "found this Note with this id  " + noteId,
      note: note,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getNotes = async (req, res, next) => {
  const categoryId = req.body.categoryId;
  const tags = req.body.tags;
  const userId = req.userId;

  const user = await User.findById(userId);
  let note;
  try {
    if (categoryId && !tags){
     note = await Note.aggregate([
      {$match : {categoryId: mongoose.Types.ObjectId(categoryId)}},
      {$match : {userId: mongoose.Types.ObjectId(userId)}},
      {$sort : {updatedAt: -1}}
    ]);
    if(note.length===0){
      res.status(200).json({
        message: "no notes available",
      });
    }
    res.status(200).json({
      message: "Notes filtered by categoryId( " + categoryId + " )",
      note: note,
    });
}
if (tags && !categoryId ){
  note = await Note.aggregate([
   {$match : {tags: {$in : [tags]}}},
   {$match : {userId: mongoose.Types.ObjectId(userId)}},
   {$sort : {updatedAt: -1}}
   
 ]);
 if(note.length===0){
  res.status(200).json({
    message: "no notes available",
  });
}
 res.status(200).json({
   message: "Notes filtered by tags name( " + tags + " )",
   note: note,
 });;
}
if (tags && categoryId ){
  note = await Note.aggregate([
   {$match : {tags: {$in : [tags]}}},
   {$match : {categoryId: mongoose.Types.ObjectId(categoryId)}},
   {$match : {userId: mongoose.Types.ObjectId(userId)}},
   {$sort : {updatedAt: -1}}
   
 ]);

 if(note.length===0){
  res.status(200).json({
    message: "no notes available",
  });
}
 res.status(200).json({
   message: "Notes filtered by tagsName(" + tags + ") and categoryId(" + categoryId + ")",
   note: note,
 });;
}
if (!tags && !categoryId ){
  note = await Note.aggregate([
    {$match : {userId: mongoose.Types.ObjectId(userId)}},
   {$sort : {updatedAt: -1}}
 ]);
 if(note.length===0){
  res.status(200).json({
    message: "no notes available",
  });
}
 res.status(200).json({
   message: "all notes for the user " + user.name ,
   note: note,
 });;
}
   
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

