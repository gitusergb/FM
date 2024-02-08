// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 3, maxlength: 30 },
    email: { type: String, required: true, unique: true, match: /\S+@\S+\.\S+/, lowercase: true },
    password: { type: String, required: true },
    avatar: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
},{
    versionKey:false
});
const User = mongoose.model('User', userSchema);

module.exports = {User};




