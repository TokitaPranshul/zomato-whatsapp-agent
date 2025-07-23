const express = require("express");
const router = express.Router();
const sendMessage = require("../utils/sendMessage");
const handleSearch = require("../utils/handleSearch");

router.post("/", async (req, res) => {
  console.log("📩 Webhook triggered!");
  const payload = req.body;
  console.log("🧾 Payload received:", JSON.stringify(payload, null, 2));

  const message = payload?.data?.body?.toLowerCase();
  const from = payload?.data?.from;

  if (payload.event_type !== "message_received") {
    console.log("ℹ️ Non-chat or system message received. Ignoring.");
    return res.sendStatus(200);
  }

  if (!message || !from) {
    console.log("❌ Missing message or sender info.");
    return res.sendStatus(400);
  }

  if (message.includes("i want") || message.includes("get me")) {
    await sendMessage(from, "🍕 Looking for food places near you...\n(Imagine we’re checking Zomato here...)");

    try {
      const results = await handleSearch(message);
      await sendMessage(from, results); // formatted top 3 links
    } catch (err) {
      console.error("❌ Error handling search:", err);
      await sendMessage(from, "❌ Sorry, something went wrong while searching.");
    }
  } else {
    await sendMessage(from, "🤖 I can help you find food. Try texting something like 'I want pizza' 🍕");
  }

  res.sendStatus(200);
});

module.exports = router;
