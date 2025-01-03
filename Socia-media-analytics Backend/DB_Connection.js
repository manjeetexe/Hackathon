const { DataAPIClient } = require('@datastax/astra-db-ts');
const dotenv = require('dotenv');

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

module.exports = db;