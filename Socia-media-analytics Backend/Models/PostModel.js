const db = require('./../DB_Connection');

// Collection name
const collectionName = 'posts';

// Ensure the collection exists
const checkCollectionExistence = async () => {
  try {
    const collections = await db.listCollections();

    if (!collections.includes(collectionName)) {
      console.log(`Collection '${collectionName}' does not exist. Creating collection...`);
      await db.createCollection(collectionName);
    } else {
      console.log(`Collection '${collectionName}' already exists. Skipping creation.`);
    }
  } catch (error) {
    if (error.message.includes('CollectionAlreadyExistsError')) {
      console.log(`Collection '${collectionName}' already exists.`);
    } else {
      console.error('Error checking or creating collection:', error);
      process.exit(1);
    }
  }
};

// Call to check collection existence when the app starts
checkCollectionExistence();

module.exports = {
  collectionName,
  db,
};