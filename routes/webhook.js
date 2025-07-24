const express = require("express");
const router = express.Router();
const sendMessage = require("../utils/sendMessage");

router.post("/", async (req, res) => {
  try {
    console.log("📦 Raw Webhook Payload:", JSON.stringify(req.body, null, 2));
    const message = req.body?.data?.body;
    const from = req.body?.data?.from;

    if (!message || !from) return res.sendStatus(400);

    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes("atta") || lowerMsg.includes("order")) {
      const staticResults = `
🔍 Top 3 Results from BigBasket:

1. 🌾 Aashirvaad Whole Wheat Atta - ₹299 for 5kg
2. 🌾 Fortune Chakki Fresh Atta - ₹289 for 5kg
3. 🌾 Pillsbury Atta - ₹285 for 5kg

Reply with the number (1, 2, 3) to proceed.
      `;
      await sendMessage(from, staticResults);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("🔥 Error in webhook:", error.message);
    res.sendStatus(500);
  }
});

module.exports = router;
