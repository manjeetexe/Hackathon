const express = require('express');
const { createPost } = require('./../Controllers/PostController');

const router = express.Router();

// Route to save data
router.post('/api/save-post', createPost);

module.exports = router;