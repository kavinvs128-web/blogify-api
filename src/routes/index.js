const express = require('express');
const router = express.Router();

const postRouter = require('./posts.routes');
const userRouter = require('./user.routes');

// Delegate routes
router.use('/posts', postRouter);
router.use('/users', userRouter);

module.exports = router;