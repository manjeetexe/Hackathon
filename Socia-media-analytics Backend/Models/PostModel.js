const db = require('./../DB_Connection');

// Collection name
const collectionName = 'posts';

// Ensure the collection exists


module.exports = {
  collectionName,
  db,
};