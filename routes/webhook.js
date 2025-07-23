// routes/webhook.js
const express = require("express");
const router = express.Router();
const { sendMessage } = require("../utils/sendMessage");
const { searchAndRespond, handleSelection } = require("../utils/loginZomato");

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const msg = body?.data?.body;
    const from = body?.data?.from || body?.data?.author;

    if (!msg || !from) return res.sendStatus(200);
    if (body?.data?.fromMe) return res.sendStatus(200);

    console.log("📩 Message:", msg);

    if (/^\s*[1-3]\s*$/.test(msg)) {
      await handleSelection(from, msg);
    } else {
      await searchAndRespond(from, msg);
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
