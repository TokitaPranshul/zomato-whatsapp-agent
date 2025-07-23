// utils/sendMessage.js
const axios = require("axios");
require("dotenv").config();

const sendMessage = async (to, message) => {
  try {
    const url = `https://api.ultramsg.com/${process.env.INSTANCE_ID}/messages/chat?token=${process.env.TOKEN}`;
    const response = await axios.post(url, {
      to,
      body: message,
      priority: 10
    });
    console.log("✅ WhatsApp message sent:", message);
  } catch (error) {
    console.error("❌ Failed to send WhatsApp message:", error.message);
  }
};

module.exports = { sendMessage };
