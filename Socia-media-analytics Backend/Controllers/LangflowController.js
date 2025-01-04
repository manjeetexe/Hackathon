// controllers/langflowController.js

const axios = require('axios');
const { API_TOKEN, LANGFLOW_API_URL } = require('./../Config/LangflowConfig');

const runModel = async (req, res) => {
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
};

module.exports = {
    runModel
};