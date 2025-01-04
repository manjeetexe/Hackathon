const express = require('express');
const cors = require('cors');
const axios = require("axios");
const dotenv = require('dotenv');
const router = require('./Routes/PostRoute');
const langflowRoutes = require('./Routes/LangflowRoute');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());


app.use(langflowRoutes);




// Use routes
app.use(router);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});