const express = require('express');
const router = express.Router();

const sendMessage = require('../utils/sendMessage');
const handleSearch = require('../utils/handleSearch');

router.post('/', async (req, res) => {
  const message = req.body.body?.toLowerCase() || '';
  const from = req.body.from;

  if (!message || !from) {
    return res.sendStatus(400);
  }

  try {
    // Respond to user with "Searching..."
    await sendMessage(from, `🔍 Searching Zomato for: *${message}*...`);

    const results = await handleSearch(message);

    if (results.length === 0) {
      await sendMessage(from, `😕 No restaurants found for: *${message}*`);
    } else {
      for (const result of results) {
        await sendMessage(from, `🍽️ ${result}`);
      }
    }

    res.sendStatus(200);
  } catch (err) {
    console.error('❌ Webhook error:', err.message);
    await sendMessage(from, '⚠️ Something went wrong. Please try again.');
    res.sendStatus(500);
  }
});

module.exports = router;
