// routes/webhook.js

const express = require('express');
const router = express.Router();
const { searchAndRespond } = require('../utils/searchAndRespond');

router.post('/', async (req, res) => {
  try {
    console.log('📩 Webhook triggered!');
    console.log('🧾 Payload received:', req.body);

    const data = req.body.data;

    if (!data || data.type !== 'chat') {
      console.log('ℹ️ Non-chat message received. Ignoring.');
      return res.status(200).send('Ignored non-chat message');
    }

    const incomingMsg = data.body?.toLowerCase();
    const from = data.from?.replace('@c.us', ''); // clean phone number

    if (!incomingMsg || !from) {
      console.log('❌ Missing "body" or "from" in request');
      return res.status(400).send('Bad Request: Missing body or from');
    }

    console.log(`💬 Incoming message from ${from}: ${incomingMsg}`);

    await searchAndRespond(from, incomingMsg);
    return res.status(200).send('Processed');
    
  } catch (error) {
    console.error('🔥 Error handling webhook:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
