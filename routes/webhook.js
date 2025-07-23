const express = require('express');
const router = express.Router();
const { sendMessage } = require('../utils/sendMessage');
const handleSearch = require('../utils/handleSearch'); // ← We call this now!

// UltraMsg webhook listener
router.post('/', async (req, res) => {
  const payload = req.body;
  console.log('📩 Webhook triggered!');
  console.log('🧾 Payload received:', JSON.stringify(payload, null, 2));

  const { event_type, data } = payload;
  if (event_type !== 'message_create') {
    console.log('ℹ️ Non-chat or system message received. Ignoring.');
    return res.sendStatus(200);
  }

  const senderId = data.from;
  const messageText = data.body?.toLowerCase() || '';

  // Step 1: Basic food query detection
  const foodQuery = messageText.match(/i want (.+)/i);
  if (foodQuery) {
    const foodItem = foodQuery[1].trim();
    console.log(`🍽️ Food search detected: "${foodItem}"`);

    // Step 2: Call Puppeteer to scrape Zomato
    try {
      const results = await handleSearch(foodItem);

      if (results.length === 0) {
        await sendMessage(senderId, `😞 Sorry, I couldn't find any places for "${foodItem}".`);
      } else {
        const formatted = results
          .map((res, idx) => `${idx + 1}. *${res.name}*\n${res.link}`)
          .join('\n\n');

        await sendMessage(senderId, `🍽️ Here are some top places for *${foodItem}* near you:\n\n${formatted}`);
      }
    } catch (err) {
      console.error('❌ Error during search:', err.message);
      await sendMessage(senderId, '⚠️ Something went wrong while searching. Please try again later.');
    }

    return res.sendStatus(200);
  }

  // Default response for other messages
  await sendMessage(senderId, "🤖 I can help you find food. Try texting something like 'I want pizza' 🍕");
  res.sendStatus(200);
});

module.exports = router;
