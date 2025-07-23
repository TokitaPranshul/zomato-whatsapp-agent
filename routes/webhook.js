const express = require('express');
const router = express.Router();
const sendMessage = require('../utils/sendMessage');
const searchAndRespond = require('../utils/searchAndRespond');

router.post('/', async (req, res) => {
  try {
    console.log('📩 Webhook triggered!');
    console.log('🧾 Payload received:', req.body);

    const messageType = req.body.type;
    if (messageType !== 'chat') {
      console.log('ℹ️ Non-chat message received. Ignoring.');
      return res.status(200).send('Ignored non-chat message');
    }

    const incomingMsg = req.body.body?.toLowerCase();
    const from = req.body.from;

    if (!incomingMsg || !from) {
      console.log('❌ Missing "body" or "from" in request');
      return res.status(400).send('Bad Request: Missing body or from');
    }

    console.log(`💬 Incoming message from ${from}: ${incomingMsg}`);

    if (incomingMsg.startsWith('i want')) {
      await searchAndRespond(from, incomingMsg);
      return res.status(200).send('Handled by searchAndRespond');
    } else if (['1', '2', '3'].includes(incomingMsg)) {
      const selection = parseInt(incomingMsg);
      await sendMessage(from, `✅ Great choice! Your order for option ${selection} is being processed. You'll receive updates here on WhatsApp. 🛵`);
      return res.status(200).send('Order confirmed');
    } else {
      await sendMessage(from, `👋 Hi! Tell me what you're craving, like: "I want Pizza from Dominos"`);
      return res.status(200).send('Prompt sent');
    }

  } catch (error) {
    console.error('🔥 Error handling webhook:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
