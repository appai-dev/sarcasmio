// pages/api/sarcastic-response.js

import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/engines/text-davinci-002/completions';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
});

export default async function handler(req, res) {
    const { question } = req.body;

    const prompt = `As a highly trained AI in the fine art of sarcasm, humor, and niceness, I've received yet another question: "${question}". Here's a response that's the perfect blend of sarcasm, wit, and charm: `;

    try {
        const result = await axiosInstance.post(OPENAI_API_URL, {
            prompt,
            max_tokens: 50,
            n: 1,
            stop: null,
            temperature: 0.7,
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
