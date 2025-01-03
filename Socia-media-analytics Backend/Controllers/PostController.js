const { savePost } = require('./../Services/PostServices');

const createPost = async (req, res) => {
  try {
    const { postType, likes, shares, comments } = req.body;

    // Validate input
    if (!postType || typeof likes !== 'number' || typeof shares !== 'number' || typeof comments !== 'number') {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Save the post using the service
    const result = await savePost({ postType, likes, shares, comments });

    if (result.success) {
      res.json({ message: 'Post created successfully', post: result.post });
    } else {
      res.status(500).json({ message: 'Failed to create post' });
    }
  } catch (error) {
    console.error('Error saving post:', error.message);
    res.status(500).json({ message: 'Error saving post', error: error.message });
  }
};

module.exports = {
  createPost,
};