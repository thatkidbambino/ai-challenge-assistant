const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://ai-challenge-assistant.vercel.app', // Replace with your Vercel frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is live');
});

app.post('/generate', async (req, res) => {
  const { game } = req.body;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Give me a unique, fun, and difficult challenge for the game: ${game}`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    res.json({ challenge: data.choices[0].message.content });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to generate challenge' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`OpenRouter backend running on port ${PORT}`));
