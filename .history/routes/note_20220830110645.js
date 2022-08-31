const express = require('express');
const { body } = require('express-validator/check');

const noteController = require('../controllers/note.js');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// // GET /feed/posts
// router.get('/posts', isAuth, noteController.getPosts);

// POST /feed/post
router.post(
  '/post',
  isAuth,
//   [
//     body('title')
//       .trim()
//       .isLength({ min: 5 }),
//     body('content')
//       .trim()
//       .isLength({ min: 5 })
//   ],
  noteController.createNote
);

// router.get('/post/:postId', isAuth, noteController.getPost);

// router.put(
//   '/post/:postId',
//   isAuth,
//   [
//     body('title')
//       .trim()
//       .isLength({ min: 5 }),
//     body('content')
//       .trim()
//       .isLength({ min: 5 })
//   ],
//   noteController.updatePost
// );

// router.delete('/post/:postId', isAuth, noteController.deletePost);

module.exports = router;
