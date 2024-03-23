const express = require('express');
const router = express.Router();

const{register,login} = require('../controllers/Auth');
const{createBlog,showAllBlogs,updateBlogs,deleteBlog} = require('../controllers/Blog');

router.post('/login',login);
router.post('/register',register);
router.post('/create',createBlog);
router.get('/show',showAllBlogs);
router.put('/update/:id',updateBlogs);
router.delete('/delete/:id',deleteBlog);

module.exports = router;