// utils/sendMessage.js

const axios = require('axios');
const instanceId = process.env.ULTRA_INSTANCE_ID;
const token = process.env.ULTRA_TOKEN;

async function sendMessage(message) {
  const payload = {
    to: process.env.MY_PHONE_NUMBER, // Must be a valid WhatsApp number with country code
    body: message
  };

  const url = `https://api.ultramsg.com/${instanceId}/messages/chat`;

  try {
    await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    });
    console.log("✅ Message sent:", message);
  } catch (error) {
    console.error("❌ Error sending message:", error.message);
  }
}

module.exports = { sendMessage };
