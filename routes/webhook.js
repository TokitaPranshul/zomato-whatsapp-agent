// routes/webhook.js
const express = require("express");
const router = express.Router();
const sendMessage = require("../utils/sendMessage");
const handleSearch = require("../utils/handleSearch");

router.post("/", async (req, res) => {
  const { from, body } = req.body;
  console.log(`📥 Message from ${from}: ${body}`);

  try {
    const results = await handleSearch(body);
    const reply = `Top matches for "${body}":\n\n${results.map((r, i) => `${i + 1}. ${r}`).join("\n")}`;
    await sendMessage(from, reply);
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Error:", err.message);
    await sendMessage(from, "Something went wrong! 🧯 Please try again later.");
    res.sendStatus(500);
  }
});

module.exports = router;
