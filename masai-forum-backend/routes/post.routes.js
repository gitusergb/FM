// routes/postRoutes.js
const express = require('express');
const {allposts,searchPostsByTitle,getPostsByCategory,createPost,likePost,commentOnPost,updatePost,deletePost} = require('../controllers/postController');
const {auth} = require('../middleware/auth.middleware');

const postRouter = express.Router();

postRouter.get('/posts/category',getPostsByCategory); 
postRouter.get('/posts/search',searchPostsByTitle); 

postRouter.post('/posts', auth, createPost);
postRouter.post('/posts/:post_id/like', auth, likePost);
postRouter.post('/posts/:post_id/comment', auth, commentOnPost);

postRouter.patch('/posts/:post_id', auth,updatePost);
postRouter.delete('/posts/:post_id', auth, deletePost);

module.exports = {postRouter};
