const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' })); // You can restrict later
app.use(express.json());

const BOT_TOKEN = '8380181984:AAEFrwOrYzcnjbodzfMsfzhfwWO3KZhNLFM';

app.post('/send-message', async (req, res) => {
  const { chat_id, text, parse_mode } = req.body;
  if (!chat_id || !text) return res.status(400).json({ error: 'chat_id and text are required' });

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text, parse_mode })
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Telegram proxy running'));