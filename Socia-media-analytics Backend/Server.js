const express = require('express');
const cors = require('cors');
const axios = require("axios");
const dotenv = require('dotenv');
const router = require('./Routes/PostRoute');
const langflowRoutes = require('./Routes/LangflowRoute');


dotenv.config();

// Initialize Express app
const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL,  
  methods: 'GET, POST, PUT, DELETE',  
  allowedHeaders: 'Content-Type, Authorization',  
};

app.use(cors(corsOptions));
app.use(express.json());


app.use(langflowRoutes);

app.use(router);


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});