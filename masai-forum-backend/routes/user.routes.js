// routes/userRoutes.js

const express = require('express');
const {register,login,googleLogin,logoutUser} = require('../controllers/userController');
const userRouter = express.Router();
const {auth} = require('../middleware/auth.middleware');

 userRouter.post('/register', register);
 userRouter.post('/login', login);
 userRouter.post('/auth/google', googleLogin);
 userRouter.get('/logout', auth,logoutUser);

module.exports = {userRouter};