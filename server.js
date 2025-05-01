require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

app.post('/gemini', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ text });
    } catch (error) {
        console.error("Gemini SDK Error:", error);
        res.status(500).json({ error: 'Gemini SDK failed to respond' });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
