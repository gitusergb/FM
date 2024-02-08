// routes/authRoutes.js

const express = require('express');
const {pagination,allUserProfile} = require('../controllers/adminController');
const {auth} = require('../middleware/auth.middleware');

const adminRoutes = express.Router();

adminRoutes.get('/posts?page=1&limit=5',auth,pagination);
adminRoutes.get('/posts',auth,allUserProfile);

module.exports = {adminRoutes};