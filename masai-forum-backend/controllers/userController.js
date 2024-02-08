// controllers/usercontroller.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');


    // username,
    // email,
    // password,
    // avatar,
    // created_at,
    // updated_at,

// Register a new user
const register = async (req, res, next) => {
    //  user registration
    const {username,
        email,
        password,
        avatar,
        created_at,
        updated_at}=req.body
 
    try { 
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
   bcrypt.hash(password,5,async(err,hash)=>{
      if(err){
              res.status(200).send({"error":err})
      }else{
          const user=new User({username,
            email,
            password:hash,
            avatar,
            created_at,
            updated_at})
          await user.save()
          res.status(200).send({ msg: 'The new user has been registered',registeredUser:user});
      }
   });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

};

// Login user
const login = async (req, res, next) => {
    //  user login

    const {email, password} = req.body;
    try {
     
      const user = await User.findOne({email});
      bcrypt.compare(password,user.password,(err, result)=>{
       if(result){
          const token = jwt.sign({ userID:user._id,name:user.name},process.env.JWT_SECRET);
          res.status(200).send({ msg:'Login successful!', "token" : token,expiredIn:"7 days" });
       }else{
          res.status(400).send({ error:'Invalid email or password' });
       }
      })
    } catch (err) {
      res.status(400).json({ error: err });
    }
};

// Google OAuth login
const googleLogin = async (req, res, next) => {
    // Google OAuth login
};


// GET /users/logout
const logoutUser = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
      res.status(200).json({ msg: 'User has been logged out' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = {register,login,googleLogin , logoutUser };