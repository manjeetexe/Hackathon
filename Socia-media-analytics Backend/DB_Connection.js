const { DataAPIClient } = require('@datastax/astra-db-ts');
const dotenv = require('dotenv');


dotenv.config();


if (!process.env.ASTRA_DB_TOKEN || !process.env.ASTRA_DB_URL) {
  console.error('Missing required environment variables. Please check your .env file');
  process.exit(1);
}


const client = new DataAPIClient(process.env.ASTRA_DB_TOKEN);
const db = client.db(process.env.ASTRA_DB_URL);

module.exports = db;