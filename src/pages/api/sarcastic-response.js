// pages/api/sarcastic-response.js

import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
});

export default async function handler(req, res) {
    const { question, temperature } = req.body; // Add temperature to the destructuring assignment

    const prompt = `As an AI who's been keeping up with the news and up on current topics, including the fine art of sarcasm, humor, and niceness, I've received yet another question: "${question}". Here's a response that's the perfect blend of sarcasm, wit, and charm: `;

    try {
        const result = await axiosInstance.post(OPENAI_API_URL, {
            prompt,
            max_tokens: 50,
            n: 1,
            stop: null,
            temperature: temperature / 10, // Set the temperature value from the slider
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        const sarcasticResponse = result.data.choices[0].text.trim();
        res.status(200).json({ sarcasticResponse });
    } catch (error) {
        console.error('OpenAI API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Error fetching sarcastic response' });
    }
}
