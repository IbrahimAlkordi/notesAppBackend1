

const { validationResult } = require('express-validator/check');

const Note = require('../models/note');
const User = require('../models/user');


exports.createNote = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
 
  const title = req.body.title;
  const content = req.body.content;
  let creator;
  const note = new Note({
    title: title,
    content: content,
    creator: req.userId
  });
  note
    .save()
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      creator = user;
    //   user.notes.push(note);
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Note created successfully!',
        note: note,
        creator: { _id: creator._id, name: creator.name }
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};