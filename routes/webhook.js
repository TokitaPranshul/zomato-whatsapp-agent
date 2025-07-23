const express = require('express');
const router = express.Router();
const sendMessage = require('../utils/sendMessage');
const handleSearch = require('../utils/handleSearch'); // if you split logic
const parseIntent = require('../utils/parseIntent');   // optional

router.post('/', async (req, res) => {
  try {
    const payload = req.body;
    console.log('📩 Webhook triggered!');
    console.log('🧾 Payload received:', JSON.stringify(payload, null, 2));

    const data = payload.data;

    // Process only incoming chat messages from real users
    if (
      payload.event_type === 'message_received' &&
      data.type === 'chat' &&
      data.fromMe === false
    ) {
      const userMessage = data.body.toLowerCase().trim();
      const senderId = data.from;

      console.log(`💬 Incoming message from ${senderId}: ${userMessage}`);

      // ✨ Add your basic NLP or intent parser here
      if (userMessage.includes('pizza')) {
        const response = `🍕 Looking for pizza places near you...\n(Imagine we’re checking Zomato here...)`;
        await sendMessage(senderId, response);
      } else {
        const defaultReply = `🤖 I can help you find food. Try texting "I want pizza" 🍕`;
        await sendMessage(senderId, defaultReply);
      }

      res.status(200).send('Processed');
    } else {
      console.log('ℹ️ Non-chat or system message received. Ignoring.');
      res.status(200).send('Ignored');
    }
  } catch (error) {
    console.error('🔥 Error handling webhook:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
