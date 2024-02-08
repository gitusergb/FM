// models/post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userID: { type:String, ref:'User', required:true },
    title: { type: String, required: true, maxlength: 100 },
    category: { type: String, enum: ['Development', 'Design', 'Innovation', 'Tutorial', 'Bussiness'] },
    content: { type: String, required: true },
    media: [{ type: String }],
    likes: [{ type:String, ref: 'User' }],
    comments: [{
        userID: {type:String, ref: 'User' },
        text: { type: String },
        created_at: { type: Date, default: Date.now },
    }],
    created_at: { type: Date, default: Date.now },
    username:{type:String}
},{
    versionKey:false
  });
  
  const Post = mongoose.model('Post', postSchema);

  module.exports = {Post};

