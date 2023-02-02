const express = require('express');
const router = express();

const {
  addPostValidation,
  patchPostValidation,
} = require('../middlewares/validationMiddleware');

const {
  getPosts,
  getPostById,
  addPost,
  changePostById,
  patchPostById,
  deletePost,
} = require('../controllers/postsController');

router.get('/', getPosts);

router.get('/:id', getPostById);

router.post('/', addPostValidation, addPost);

router.put('/:id', addPostValidation, changePostById);

router.patch('/:id', patchPostValidation, patchPostById);

router.delete('/:id', deletePost);

module.exports = {postsRouter: router};
