const User = require('../users/users-model')

function logger(req, res, next) {
  console.log(`Method: ${req.method}, URL: ${req.url}. Date: ${new Date()}`)
  next()
}

async function validateUserId(req, res, next) {
 const findUser = await User.getById(req.params.id)
  try{
    if(findUser){
      req.user = findUser
      next()
    } else {
      res.status(404).json({ message: "user not found" })
    }
  } catch(err){
      next(err)
  }
}

function validateUser(req, res, next) {
  const { name } = req.body
  if(name !== undefined){
    next()
  } else {
    res.status(400).json({ message: "missing required name field"})
  }
}

function validatePost(req, res, next) {
  if(req.body.text){
    next()
  } else {
    res.status(400).json({ message: "missing required text field" })
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger, 
  validateUserId,
  validateUser,
  validatePost
}