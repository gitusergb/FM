// controllers/postController.js
const {Post} = require('../models/post');

//get all posts
//get
const allposts = async (req, res, next) => {
  // user profile
 
try { 
    const posts = await Post.find({userID:req.body.userID})
    res.status(200).send(posts);
      } catch (error) {
        res.status(400).send({ error: error.message });
      }

}


// Get posts by category
const getPostsByCategory = async (req, res, next) => {
  try {
      const { category } = req.query;

      if (!category) {
          return res.status(400).json({ error: 'Category parameter is required.' });
      }

      const posts = await Post.find({ category })
          .populate('user_id', 'username avatar')
          .exec();

      res.status(200).json({ posts });
  } catch (error) {
      next(error);
  }
};

// Search posts by title
const searchPostsByTitle = async (req, res, next) => {
  try {
      const { title } = req.query;

      if (!title) {
          return res.status(400).json({ error: 'Title parameter is required.' });
      }

      const posts = await Post.find({ title: { $regex: title, $options: 'i' } }) // Case-insensitive search
          .populate('user_id', 'username avatar')
          .exec();

      res.status(200).json({ posts });
  } catch (error) {
      next(error);
  }
};
// Create a new post
const createPost = async (req, res, next) => {
    //  creating a new post
    try { 
        const post = new Post(req.body)
        await post.save()
        res.status(200).json({ msg:'A new post has been Created',post:post});
          } catch (error) {
            res.status(400).json({ error: error.message });
          }
};

// Like a post
const likePost = async (req, res, next) => {
    //  liking a post
  try {
      const { post_id } = req.params;
      const { user_id } = req.body;

      if (!post_id || !user_id) {
          return res.status(400).json({ error: 'Post ID and user ID are required.' });
      }

      const post = await Post.findById(post_id);

      if (!post) {
          return res.status(404).json({ error: 'Post not found.' });
      }

      // Check if the user has already liked the post
      if (post.likes.includes(user_id)) {
          return res.status(400).json({ error: 'User has already liked the post.' });
      }

      // Add user to the likes array
      post.likes.push(user_id);
      await post.save();

      res.status(201).json({ message: 'Post liked successfully.' });
  } catch (error) {
      next(error);
  }

};

// Comment on a post
const commentOnPost = async (req, res, next) => {
    //  commenting on a post
      try {
          const { post_id } = req.params;
          const { user_id, text } = req.body;
  
          if (!post_id || !user_id || !text) {
              return res.status(400).json({ error: 'Post ID, user ID, and comment text are required.' });
          }
  
          const post = await Post.findById(post_id);
  
          if (!post) {
              return res.status(404).json({ error: 'Post not found.' });
          }
  
          // Add the comment to the comments array
          post.comments.push({ user_id, text });
          await post.save();
  
          res.status(201).json({ message: 'Comment added successfully.' });
      } catch (error) {
          next(error);
      }
};

// Edit a post
const updatePost = async (req, res, next) => {
    //  editing a post
    const {post_id}=req.params
    console.log(post_id)
   
    try { 
        const post = await Post.findOne({_id:post_id})
        console.log(post)
        if(req.body.userID===post.userID){
       await Post.findByIdAndUpdate({_id:post_id},req.body)
       res.status(200).send({ msg:`post with Id:${post_id} has been updated`});}
       else{
        res.status(400).send({ msg:`You are not Authorised`});}
       
          } catch (error) {
            res.status(400).send({ error: error.message });
          }
};

// Delete a post
const deletePost = async (req, res, next) => {
    //  deleting a post
    const {post_id}=req.params
    try { 
        const post = await Post.findOne({_id:post_id})
        if(req.body.userID===post.userID){
       await Post.findByIdAndDelete({_id:post_id})
       res.status(200).send({ msg:`post with Id:${post_id} has been deleted`});}
       else{
        res.status(400).send({ msg:`You are not Authorised`});}
       
          } catch (error) {
            res.status(400).send({ error: error.message });
          }

};


module.exports = {allposts,searchPostsByTitle,getPostsByCategory,createPost,likePost,commentOnPost,updatePost,deletePost};