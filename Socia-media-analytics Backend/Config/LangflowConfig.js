// config/config.js

require('dotenv').config();

module.exports = {
    API_TOKEN: process.env.API_TOKEN, // Store token in .env file
    LANGFLOW_API_URL: process.env.LANGFLOW_API_URL, // Store URL in .env file
};