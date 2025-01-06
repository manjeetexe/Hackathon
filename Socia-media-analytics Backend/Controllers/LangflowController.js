const axios = require('axios');
const { API_TOKEN, LANGFLOW_API_URL } = require('./../Config/LangflowConfig');

const runModel = async (req, res) => {
    try {
        // Log the request body for debugging
        console.log("Request Body:", req.body);

        // Extract postType from the request body and use it as input_value
        const { postType } = req.body;

        // Validate postType
        if (!postType) {
            return res.status(400).json({ error: "postType is required" });
        }

        // Build the payload
        const payload = {
            input_value: postType, // Use postType as input_value
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

        console.log("Payload Sent to Langflow:", payload);

        // Send the request to the Langflow API
        const response = await axios.post(LANGFLOW_API_URL, payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_TOKEN}`
            }
        });

        console.log("Langflow API Response:", response.data);

        // Respond with the data from Langflow
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error calling Langflow API:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || error.message });
    }
};

module.exports = {
    runModel
};