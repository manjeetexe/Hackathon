const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./Routes/PostRoute');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Use routes
app.use(router);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});