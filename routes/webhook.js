const express = require('express');
const router = express.Router();
const sendMessage = require('../utils/sendMessage'); // ✅ Import correctly

router.post('/', async (req, res) => {
  try {
    console.log('📩 Webhook triggered!');
    const payload = req.body;

    console.log('🧾 Payload received:', JSON.stringify(payload, null, 2));

    const eventType = payload.event_type;
    const messageData = payload.data;

    // Only proceed if it's a message_create event and it's a user (not self) message
    if (eventType === 'message_create' && messageData?.fromMe === false) {
      const senderId = messageData.from;
      const messageText = messageData.body.toLowerCase();

      console.log(`💬 Incoming message from ${senderId}: ${messageText}`);
      console.log('🔍 Processing message:', messageText);

      // Basic message logic
      if (messageText.includes('pizza')) {
        const reply = `🍕 Top Pizza Places Near You:
1. Dominos - ETA: 30 mins
2. Oven Story - ETA: 35 mins
3. Pizza Hut - ETA: 40 mins

Reply with 1, 2 or 3 to choose.`;

        await sendMessage(senderId, reply);
      } else if (['1', '2', '3'].includes(messageText.trim())) {
        const replies = {
          '1': '✅ You selected Dominos! We are placing your order. 🍕 ETA: 30 mins.',
          '2': '✅ You selected Oven Story! We are placing your order. 🍕 ETA: 35 mins.',
          '3': '✅ You selected Pizza Hut! We are placing your order. 🍕 ETA: 40 mins.',
        };
        await sendMessage(senderId, replies[messageText.trim()]);
      } else {
        const fallback = '🤖 I can help you find food. Try texting "I want pizza" 🍕';
        await sendMessage(senderId, fallback);
      }

      console.log(`✅ Message sent to ${senderId}`);
    } else {
      console.log('ℹ️ Non-chat message received. Ignoring.');
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('🔥 Error handling webhook:', error.message);
    res.sendStatus(500);
  }
});

module.exports = router;
