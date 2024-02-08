// controllers/adminController.js
const {User} = require('../models/user');
const {Post} = require('../models/post');

// Get user profile
const pagination = async (req, res, next) => {
    // Implementation for getting user profile
    try {
        const { page = 1, limit = 5, minComments, maxComments,device} = req.query;
    
        if (minComments && maxComments) {
          query.no_of_comments = { $gte: minComments, $lte: maxComments };
        }
    
        if (device) {
            query.device =device;
          }

        const options = {
          page: parseInt(page),
          limit: parseInt(limit),
        };
    
        const posts = await Post.find()
          .skip((parseInt(page) - 1) * parseInt(limit))
          .limit(parseInt(limit));
          //const posts = await Post.find({userID:req.body.userID})
        res.status(200).send(posts);
          } catch (error) {
            res.status(400).send({ error: error.message });
          }

};

//get
const allUserProfile = async (req, res, next) => {
    // user profiles
  try { 
      const post = await Post.find()
      res.status(200).send(post);
        } catch (error) {
          res.status(400).send({ error: error.message });
        }
};
module.exports = {pagination,allUserProfile};