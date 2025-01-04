const express = require('express');
const cors = require('cors');
const axios = require("axios");
const dotenv = require('dotenv');
const router = require('./Routes/PostRoute');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());


const API_TOKEN = "AstraCS:ayPPrzPDqTSdixYCMNkQCUJM:ec23f7eaa9585f70bbb93d436a63e5ad89d7a69bd7b035904e8314b81f6f2bfd"; // Store token in .env file
const LANGFLOW_API_URL = "https://api.langflow.astra.datastax.com/lf/1577ca97-14ed-4596-8585-e7fd38f0a9e1/api/v1/run/93e2bf8b-afbc-42e3-945f-6e287231b425?stream=false"; // Store URL in .env file

router.post("/run-model", async (req, res) => {
    try {
        const { input_value } = req.body;

        const payload = {
            input_value,
            output_type: "chat",
            input_type: "chat",
            tweaks: {
                "ChatOutput-JBvoM": {},
                "ChatInput-eww3n": {},
                "AstraDBToolComponent-rZ4Mi": {},
                "ParseData-ykq59": {},
                "Prompt-G6oUM": {},
                "GroqModel-Kgaa9": {},
                "Prompt-PASUv": {}
            }
        };

        const response = await axios.post(LANGFLOW_API_URL, payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_TOKEN}`
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error calling Langflow API:", error.message);
        res.status(500).json({ error: error.message });
    }
});


// Use routes
app.use(router);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});