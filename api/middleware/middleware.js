const Users = require('../users/users-model');

function logger(req, res, next) {
  console.log(
    `A ${req.method} request was made to ${req.url}, at ${new Date().toLocaleString()}
  `);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const {id} = req.params;
    const user = await Users.getById(id);
    if(!user) {
      res.status(404).json({
        message: 'user not found'
      });
    } else {
      req.user = user;
      next();
    }
  } catch(error) {
    res.status(500).json({
      message: 'error getting user'
    });
  }
}

function validateUser(req, res, next) {
  const {name} = req.body;
  if(
    name !== undefined 
    && typeof name === 'string' 
    && name.length 
    && name.trim().length
  ) {
    req.name = name;
    next();
  } else {
    res.status(400).json({
      message: 'missing required name field'
    });
  }
}

function validatePost(req, res, next) {
  const {text} = req.body;
  if(!text || !text.trim()) {
    res.status(400).json({
      message: 'missing required text field'
    });
  } else {
    req.text = text.trim();
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId, 
  validateUser,
  validatePost
};