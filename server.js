
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (like our frontend HTML)
app.use(express.static('public'));

// API endpoint to set Alpaca API keys
app.post('/set-keys', (req, res) => {
  const { apiKey, secretKey } = req.body;

  // Store these in an appropriate secure place
  // For the sake of simplicity, we're storing them in memory
  global.API_KEY = apiKey;
  global.SECRET_KEY = secretKey;

  res.send({ success: true });
});

// API endpoint to get portfolio data
app.get('/portfolio', async (req, res) => {
  try {
    const response = await axios.get('https://paper-api.alpaca.markets/v2/account', {
      headers: {
        'APCA-API-KEY-ID': global.API_KEY,
        'APCA-API-SECRET-KEY': global.SECRET_KEY
      }
    });

    const account = response.data;
    res.send(account);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
