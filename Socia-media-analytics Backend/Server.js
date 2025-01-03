const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { DataAPIClient } = require('@datastax/astra-db-ts');

// Load environment variables
dotenv.config();

// Validate environment variables
if (!process.env.ASTRA_DB_TOKEN || !process.env.ASTRA_DB_URL) {
  console.error('Missing required environment variables. Please check your .env file');
  process.exit(1);
}

// Initialize the DataAPIClient
const client = new DataAPIClient(process.env.ASTRA_DB_TOKEN);
const db = client.db(process.env.ASTRA_DB_URL);

// Initialize Express app
const app = express();

app.use(cors());
app.use(express.json());

// Collection name
const collectionName = 'posts';

// Ensure the `posts` collection exists only if it doesn't already exist
const checkCollectionExistence = async () => {
  try {
    const collections = await db.listCollections();

    if (!collections.includes(collectionName)) {
      console.log(`Creating collection: ${collectionName}`);
      await db.createCollection(collectionName);
    } else {
      console.log(`Collection '${collectionName}' already exists. Skipping creation.`);
    }
  } catch (error) {
    // If the collection already exists, we'll handle it gracefully and not terminate the process
    if (error.message.includes('CollectionAlreadyExistsError')) {
      console.log(`Collection '${collectionName}' already exists.`);
    } else {
      console.error('Error checking or creating collection:', error);
      process.exit(1);
    }
  }
};

// Check the collection existence when the server starts
checkCollectionExistence();

// Route to save data
app.post('/api/save-post', async (req, res) => {
  try {
    const { postType, likes, shares, comments } = req.body;

    // Validate input
    if (!postType || typeof likes !== 'number' || typeof shares !== 'number' || typeof comments !== 'number') {
      return res.status(400).json({ message: 'Invalid input data' });
    }

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
    const result = await db.collection(collectionName).insertOne(document);

    if (result && result.insertedId) {
      res.json({ message: 'Post created successfully', post: document });
      console.log('Post created successfully');
    } else {
      throw new Error('Failed to insert document');
    }
  } catch (error) {
    console.error('Error saving post:', error.message);
    res.status(500).json({ message: 'Error saving post', error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});