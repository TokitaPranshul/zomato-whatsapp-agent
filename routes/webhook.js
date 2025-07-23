// routes/webhook.js

const express = require('express');
const router = express.Router();
const { searchAndRespond } = require('../utils/searchAndRespond');

router.post('/', async (req, res) => {
  const message = req.body?.body?.message;

  if (!message) {
    console.log("⚠️ No message received in webhook");
    return res.sendStatus(400);
  }

  try {
    await searchAndRespond(message);
    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    res.status(500).send("Error processing webhook");
  }
});

module.exports = router;
