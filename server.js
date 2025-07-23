// server.js

const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const webhookRoutes = require('./routes/webhook');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Route: POST /webhook
app.use('/webhook', webhookRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('🚀 WhatsApp Zomato Agent is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
