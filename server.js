// server.js

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const webhookRoutes = require('./routes/webhook');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Native JSON parsing
app.use(express.json());

app.use('/webhook', webhookRoutes);

app.get('/', (req, res) => {
  res.send('🚀 WhatsApp Zomato Agent is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
