const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const { 
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch(error) {
    next(error);
  } 
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
    res.status(200).json(req.user);
});

router.post('/', validateUser, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try {
    const createdUser = await Users.insert({name: req.name});
    res.status(201).json(createdUser);
  } catch(error) {
    next(error);
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const {id} = req.params;
    const updatedUser = await Users.update(id, {name: req.name});
    res.status(200).json(updatedUser);
  } catch(error) {
    next(error);
  }
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    const {id} = req.params;
    const numOfDeletedUsers = await Users.remove(id);
    if(numOfDeletedUsers) {
      res.status(200).json(req.user);
    }
  } catch(error) {
    next(error);
  }
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log(req.user)
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user)
  console.log(req.text)
});

router.use((error, req, res, next) => { //eslint-disable-line
  res.status(error.status || 500).json({
    message: error.message
  })
})

// do not forget to export the router
module.exports = router;