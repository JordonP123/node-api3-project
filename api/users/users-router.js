const express = require('express');
const User = require('./users-model')
const Post = require('../posts/posts-model')
const { validateUser, validateUserId, validatePost } = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();
  

// RETURN AN ARRAY WITH ALL THE USERS
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
router.get('/', async(req, res) => {
try{
  const users = await User.get()
  res.json(users)
} catch {
  res.status(500).json({
    message: 'could not get users :('
  })
}
});


  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});


  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
router.post('/', validateUser, async(req, res) => {
  try{
    const addUser = await User.insert(req.body)
    res.status(201).json(addUser)
  } catch(err) {
    res.status(500).json({ message: 'Failed to add a user'})
  }
});


  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
router.put('/:id', validateUserId, validateUser, async(req, res) => {
  try{
    const updateUser = await User.update(req.params.id, req.body)
    res.status(201).json(updateUser)
  } catch {
    res.status(500).json({ message: 'Failed to update user'})
  }
});


  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
router.delete('/:id', validateUserId, async(req, res) => {
  try{
    const removeUser = await User.remove(req.params.id)
    res.json(req.user)
    removeUser
  } catch(err) {
    res.status(500).json({ message: 'Failed to delete user'})
  }
});


  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
router.get('/:id/posts', validateUserId, async(req, res) => {
  try{
    const getPosts = await User.getUserPosts(req.params.id)
    res.json(getPosts)
  } catch(err){
    res.status(500).json({ message: 'Failed to get users posts'})

  }
});


  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
router.post('/:id/posts',validateUserId, validatePost, async(req, res) => {
  try{
    const addPost = await Post.insert({user_id: req.params.id, text: req.body.text})
    res.status(201).json(addPost)
  } catch(err){
    res.status(500).json({ message: 'Failed to add post'})
  }
});

// do not forget to export the router
module.exports = router