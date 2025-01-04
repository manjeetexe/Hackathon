// routes/langflowRoutes.js

const express = require('express');
const router = express.Router();
const { runModel } = require('./../Controllers/LangflowController');

router.post("/run-model", runModel);

module.exports = router;