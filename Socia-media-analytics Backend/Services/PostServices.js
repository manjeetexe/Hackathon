const { db, collectionName } = require('./../Models/PostModel');

const savePost = async (postData) => {
  const { postType, likes, shares, comments } = postData;

  // Document to be saved
  const document = {
    id: `post-${Date.now()}`, // Unique ID
    postType,
    likes,
    shares,
    comments,
    createdAt: new Date().toISOString(),
  };

  // Insert document into the collection
  try {
    const result = await db.collection(collectionName).insertOne(document);

    if (result && result.insertedId) {
      console.log('Post created successfully');
      return { success: true, post: document };
    } else {
      throw new Error('Failed to insert document');
    }
  } catch (error) {
    console.error('Error saving post:', error.message);
    throw new Error('Error saving post');
  }
};

module.exports = {
  savePost,
};